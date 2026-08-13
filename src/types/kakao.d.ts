/* Minimal Kakao Maps typings used by MapPage */
declare namespace kakao.maps {
  class LatLng {
    constructor(lat: number, lng: number)
  }
  class LatLngBounds {
    extend(latlng: LatLng): void
  }
  class Map {
    constructor(
      container: HTMLElement,
      options: { center: LatLng; level: number },
    )
    panTo(latlng: LatLng): void
    setLevel(level: number): void
    setBounds(bounds: LatLngBounds): void
  }
  class Marker {
    constructor(options: { position: LatLng })
  }
  class MarkerClusterer {
    constructor(options: {
      map: Map
      averageCenter?: boolean
      minLevel?: number
    })
    clear(): void
    addMarkers(markers: Marker[]): void
  }
  class InfoWindow {
    constructor(options?: { zIndex?: number })
    setContent(content: string): void
    open(map: Map, marker: Marker): void
    close(): void
  }
  const event: {
    addListener(target: object, type: string, handler: () => void): void
  }
  function load(callback: () => void): void
}

declare namespace kakao {
  const maps: typeof kakao.maps
}

interface Window {
  kakao: typeof kakao
}
