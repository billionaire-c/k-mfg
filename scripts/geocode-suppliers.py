"""
스마트공장 공급기업 CSV → 카카오 주소 검색으로 좌표 부여.
사용: python scripts/geocode-suppliers.py
필요: .env 의 KAKAO_REST_API_KEY
"""

from __future__ import annotations

import csv
import json
import os
import time
import urllib.parse
import urllib.request
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
CSV_PATH = ROOT / "data" / "raw" / "suppliers-smartfactory-20250910.csv"
OUT_PATH = ROOT / "public" / "data" / "suppliers.json"
PROGRESS_PATH = ROOT / "data" / "raw" / "geocode-progress.json"


def load_env() -> None:
    env_path = ROOT / ".env"
    if not env_path.exists():
        return
    for line in env_path.read_text(encoding="utf-8").splitlines():
        line = line.strip()
        if not line or line.startswith("#") or "=" not in line:
            continue
        key, value = line.split("=", 1)
        os.environ.setdefault(key.strip(), value.strip().strip('"').strip("'"))


def geocode(address: str, api_key: str) -> tuple[float, float] | None:
    query = urllib.parse.urlencode({"query": address})
    url = f"https://dapi.kakao.com/v2/local/search/address.json?{query}"
    req = urllib.request.Request(
        url,
        headers={"Authorization": f"KakaoAK {api_key}"},
    )
    with urllib.request.urlopen(req, timeout=20) as res:
        data = json.loads(res.read().decode("utf-8"))
    docs = data.get("documents") or []
    if not docs:
        # 키워드 검색 폴백
        query = urllib.parse.urlencode({"query": address})
        url = f"https://dapi.kakao.com/v2/local/search/keyword.json?{query}"
        req = urllib.request.Request(
            url,
            headers={"Authorization": f"KakaoAK {api_key}"},
        )
        with urllib.request.urlopen(req, timeout=20) as res:
            data = json.loads(res.read().decode("utf-8"))
        docs = data.get("documents") or []
        if not docs:
            return None
        return float(docs[0]["y"]), float(docs[0]["x"])

    doc = docs[0]
    road = doc.get("road_address") or {}
    addr = doc.get("address") or {}
    y = road.get("y") or addr.get("y") or doc.get("y")
    x = road.get("x") or addr.get("x") or doc.get("x")
    if y is None or x is None:
        return None
    return float(y), float(x)


def main() -> None:
    load_env()
    api_key = os.environ.get("KAKAO_REST_API_KEY", "").strip()
    if not api_key:
        raise SystemExit("KAKAO_REST_API_KEY missing in .env")

    with CSV_PATH.open(encoding="cp949", newline="") as f:
        rows = list(csv.DictReader(f))

    progress: dict[str, dict] = {}
    if PROGRESS_PATH.exists():
        progress = json.loads(PROGRESS_PATH.read_text(encoding="utf-8"))

    items: list[dict] = []
    ok = 0
    fail = 0

    for i, row in enumerate(rows, start=1):
        sid = (row.get("부여번호") or "").strip()
        name = (row.get("기업명") or "").strip()
        address = (row.get("주소") or "").strip()
        phone = (row.get("담당자연락처") or "").strip()

        if sid in progress:
            cached = progress[sid]
            if cached.get("lat") is not None:
                items.append(cached)
                ok += 1
            else:
                fail += 1
            continue

        entry = {
            "id": sid,
            "name": name,
            "address": address,
            "phone": phone,
            "lat": None,
            "lng": None,
        }

        if not address:
            progress[sid] = entry
            fail += 1
        else:
            try:
                coords = geocode(address, api_key)
                if coords:
                    entry["lat"], entry["lng"] = coords
                    items.append(entry)
                    ok += 1
                else:
                    fail += 1
                progress[sid] = entry
            except Exception as exc:  # noqa: BLE001
                entry["error"] = str(exc)[:120]
                progress[sid] = entry
                fail += 1
                print(f"[{i}/{len(rows)}] ERROR {name}: {exc}")
                time.sleep(0.5)
                continue

        if i % 25 == 0:
            PROGRESS_PATH.write_text(
                json.dumps(progress, ensure_ascii=False),
                encoding="utf-8",
            )
            print(f"[{i}/{len(rows)}] ok={ok} fail={fail}")

        time.sleep(0.08)

    # 좌표 있는 것만 최종 저장 (progress 기준)
    mapped = [
        {
            "id": v.get("id"),
            "name": v.get("name"),
            "address": v.get("address"),
            "phone": v.get("phone") or "",
            "lat": v.get("lat"),
            "lng": v.get("lng"),
        }
        for v in progress.values()
        if v.get("lat") is not None and v.get("lng") is not None
    ]

    OUT_PATH.parent.mkdir(parents=True, exist_ok=True)
    payload = {
        "source": "중소벤처기업부_스마트제조혁신추진단 스마트공장공급기업_20250910",
        "sourceUrl": "https://www.data.go.kr/data/15042132/fileData.do",
        "updatedAt": time.strftime("%Y-%m-%d"),
        "totalRaw": len(rows),
        "totalMapped": len(mapped),
        "items": mapped,
    }
    OUT_PATH.write_text(json.dumps(payload, ensure_ascii=False), encoding="utf-8")
    PROGRESS_PATH.write_text(json.dumps(progress, ensure_ascii=False), encoding="utf-8")
    print(f"DONE mapped={len(mapped)} / raw={len(rows)} -> {OUT_PATH}")


if __name__ == "__main__":
    main()
