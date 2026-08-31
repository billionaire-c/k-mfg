"""
식품 스마트HACCP 인증업체 → public/data/smart-haccp-food.json

사용:
  python scripts/fetch-smart-haccp.py

필요:
  .env 의 DATA_GO_KR_SERVICE_KEY
  (공공데이터포털에서 「식품 스마트HACCP 인증업체 정보 서비스」 활용신청 후 발급)

Open API란?
  서버가 정해진 주소(URL)로 요청을 보내면, JSON/XML 형태로 데이터를 돌려주는
  공개 창구입니다. 브라우저 주소창에 치는 URL과 비슷하지만, 인증키·페이지 번호
  같은 조건을 쿼리로 붙입니다.

이 스크립트가 하는 일 (한 줄 요약):
  1) .env에서 인증키 읽기
  2) End Point + /getFoodList 로 HTTP GET 요청
  3) 응답 JSON에서 업체 목록 꺼내기
  4) 페이지를 넘겨가며 전부 모으기
  5) 사이트에서 쓰기 쉽게 JSON 파일로 저장
"""

from __future__ import annotations

import json
import os
import time
import urllib.error
import urllib.parse
import urllib.request
from datetime import datetime, timezone
from pathlib import Path
from typing import Any

ROOT = Path(__file__).resolve().parents[1]
OUT_PATH = ROOT / "public" / "data" / "smart-haccp-food.json"

# 공공데이터포털 「서비스 정보 → End Point」 + 상세기능 경로
BASE_URL = "https://apis.data.go.kr/B553748/SmartCertFoodListService"
OPERATION = "getFoodList"

# 한 번에 받을 건수 (너무 크면 타임아웃·거절될 수 있음)
PAGE_SIZE = 100
# 호출 간격(초) — 상대 서버 배려
SLEEP_SEC = 0.2


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


def fetch_page(service_key: str, page_no: int, num_of_rows: int) -> dict[str, Any]:
    """
    Open API 한 페이지 요청.

    URL 예:
      https://apis.data.go.kr/.../getFoodList?serviceKey=키&pageNo=1&numOfRows=100&returnType=json
    """
    query = urllib.parse.urlencode(
        {
            "serviceKey": service_key,  # urlencode가 인코딩 처리
            "pageNo": page_no,
            "numOfRows": num_of_rows,
            "returnType": "json",
        }
    )
    url = f"{BASE_URL}/{OPERATION}?{query}"
    req = urllib.request.Request(url, headers={"Accept": "application/json"})
    with urllib.request.urlopen(req, timeout=60) as res:
        raw = res.read().decode("utf-8")
    return json.loads(raw)


def unwrap_payload(data: dict[str, Any]) -> dict[str, Any]:
    """기관마다 감싸는 계층이 달라서 response/body 등을 벗겨 통일."""
    if "response" in data and isinstance(data["response"], dict):
        return data["response"]
    return data


def result_ok(payload: dict[str, Any]) -> tuple[bool, str]:
    header = payload.get("header") or {}
    code = str(
        header.get("resultCode")
        or payload.get("resultCode")
        or ""
    )
    msg = str(
        header.get("resultMsg")
        or payload.get("resultMsg")
        or ""
    )
    # 이 API는 OK / 0000 형태를 씀
    ok = code in {"OK", "00", "000", "0000", ""}
    return ok, f"{code} {msg}".strip()


def extract_items(payload: dict[str, Any]) -> list[dict[str, Any]]:
    body = payload.get("body") or payload
    items = body.get("items")
    if items is None:
        return []
    # 형태 A: { "item": [ {...}, ... ] }
    # 형태 B: [ { "item": {...} }, ... ]
    # 형태 C: { "item": { ... } }  (1건만)
    if isinstance(items, dict):
        item = items.get("item")
        if item is None:
            return []
        if isinstance(item, list):
            return [x for x in item if isinstance(x, dict)]
        if isinstance(item, dict):
            return [item]
        return []
    if isinstance(items, list):
        out: list[dict[str, Any]] = []
        for row in items:
            if not isinstance(row, dict):
                continue
            if "item" in row and isinstance(row["item"], dict):
                out.append(row["item"])
            else:
                out.append(row)
        return out
    return []


def extract_total(payload: dict[str, Any]) -> int | None:
    body = payload.get("body") or payload
    total = body.get("totalCount")
    if total is None:
        total = payload.get("totalCount")
    if total is None:
        return None
    try:
        return int(total)
    except (TypeError, ValueError):
        return None


def normalize_company(row: dict[str, Any]) -> dict[str, Any]:
    """프론트에서 쓰기 쉬운 필드명으로 정리."""
    return {
        "appointNo": str(row.get("appointno") or "").strip(),
        "licenseNo": str(row.get("licenseno") or "").strip(),
        "company": str(row.get("company") or "").strip(),
        "ceoName": str(row.get("ceoname") or row.get("ceoName") or "").strip(),
        "sido": str(row.get("sido") or "").strip(),
        "sgg": str(row.get("sgg") or "").strip(),
        "address": str(row.get("address") or row.get("addr") or "").strip(),
        "ccp": str(row.get("ccp") or "").strip(),
        "businessNm": str(row.get("businessnm") or "").strip(),
        "businessType": str(row.get("businesstype") or "").strip(),
        "businessItem": str(row.get("businessitem") or "").strip(),
        "appointYn": str(row.get("appointyn") or "").strip(),
        "year": str(row.get("year") or "").strip(),
    }


def main() -> None:
    load_env()
    service_key = os.environ.get("DATA_GO_KR_SERVICE_KEY", "").strip()
    if not service_key:
        raise SystemExit(
            "DATA_GO_KR_SERVICE_KEY 가 .env 에 없습니다.\n"
            "공공데이터포털 일반 인증키를 DATA_GO_KR_SERVICE_KEY=... 로 넣어 주세요."
        )

    print(f"요청: {BASE_URL}/{OPERATION}")
    print(f"페이지 크기: {PAGE_SIZE}")

    try:
        first = unwrap_payload(fetch_page(service_key, 1, PAGE_SIZE))
    except urllib.error.HTTPError as e:
        raise SystemExit(
            f"HTTP {e.code} — 키·활용신청·End Point를 확인하세요.\n{e}"
        ) from e

    ok, status = result_ok(first)
    if not ok:
        raise SystemExit(f"API 오류: {status}\n응답 일부: {json.dumps(first, ensure_ascii=False)[:400]}")

    total = extract_total(first)
    page1 = extract_items(first)
    companies = [normalize_company(x) for x in page1]
    print(f"1페이지: {len(page1)}건 / 전체 안내: {total}")

    if total is not None and total > PAGE_SIZE:
        last_page = (total + PAGE_SIZE - 1) // PAGE_SIZE
        for page_no in range(2, last_page + 1):
            time.sleep(SLEEP_SEC)
            payload = unwrap_payload(fetch_page(service_key, page_no, PAGE_SIZE))
            ok, status = result_ok(payload)
            if not ok:
                raise SystemExit(f"{page_no}페이지 API 오류: {status}")
            rows = extract_items(payload)
            companies.extend(normalize_company(x) for x in rows)
            print(f"{page_no}/{last_page}페이지: +{len(rows)} (누적 {len(companies)})")

    # 동일 인증번호·품목·연도가 반복되면 한 건만 유지
    dedup: dict[str, dict[str, Any]] = {}
    for row in companies:
        key = "|".join(
            [
                row["appointNo"],
                row["businessItem"],
                row["year"],
                row["company"],
            ]
        )
        dedup[key] = row
    before = len(companies)
    companies = list(dedup.values())
    companies.sort(key=lambda r: (r["sido"], r["sgg"], r["company"], r["appointNo"]))
    if before != len(companies):
        print(f"중복 정리: {before} → {len(companies)}")

    out = {
        "meta": {
            "title": "식품 스마트HACCP 인증업체",
            "source": "한국식품안전관리인증원 / 공공데이터포털",
            "sourceUrl": "https://www.data.go.kr/data/15118080/openapi.do",
            "endpoint": f"{BASE_URL}/{OPERATION}",
            "fetchedAt": datetime.now(timezone.utc).astimezone().isoformat(timespec="seconds"),
            "count": len(companies),
            "apiTotalCount": total,
        },
        "companies": companies,
    }

    OUT_PATH.parent.mkdir(parents=True, exist_ok=True)
    OUT_PATH.write_text(
        json.dumps(out, ensure_ascii=False, indent=2) + "\n",
        encoding="utf-8",
    )
    print(f"저장: {OUT_PATH} ({len(companies)}건)")


if __name__ == "__main__":
    main()
