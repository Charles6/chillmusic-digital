import type { APIRoute } from "astro";

const WEATHER_LABELS: Record<number, string> = {
  0: "Clear", 1: "Mostly Clear", 2: "Partly Cloudy", 3: "Cloudy",
  45: "Fog", 48: "Rime Fog",
  51: "Light Drizzle", 53: "Drizzle", 55: "Heavy Drizzle",
  56: "Freezing Drizzle", 57: "Heavy Freezing Drizzle",
  61: "Light Rain", 63: "Rain", 65: "Heavy Rain",
  66: "Freezing Rain", 67: "Heavy Freezing Rain",
  71: "Light Snow", 73: "Snow", 75: "Heavy Snow", 77: "Snow Grains",
  80: "Rain Showers", 81: "Heavy Showers", 82: "Violent Showers",
  85: "Snow Showers", 86: "Heavy Snow Showers",
  95: "Thunderstorm", 96: "Thunder and Hail", 99: "Severe Thunderstorm",
};

export const GET: APIRoute = async ({ url }) => {
  const lat = url.searchParams.get("lat");
  const lon = url.searchParams.get("lon");

  if (!lat || !lon || isNaN(Number(lat)) || isNaN(Number(lon))) {
    return new Response(
      JSON.stringify({ error: "lat and lon query params are required" }),
      { status: 400, headers: { "content-type": "application/json" } },
    );
  }

  const weatherUrl =
    `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}` +
    "&current=temperature_2m,weather_code&current_weather=true&temperature_unit=celsius";
  const locationUrl =
    `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}` +
    "&format=jsonv2&zoom=10&addressdetails=1&accept-language=en";

  try {
    const [weatherRes, locationRes] = await Promise.all([
      fetch(weatherUrl),
      fetch(locationUrl, {
        headers: { "user-agent": "chillmusic.digital/1.0" },
      }).catch(() => null),
    ]);

    if (!weatherRes.ok) {
      throw new Error(`Weather API responded ${weatherRes.status}`);
    }

    const weatherJson = await weatherRes.json() as Record<string, unknown>;
    const locationJson = locationRes?.ok
      ? (await locationRes.json() as Record<string, unknown>)
      : null;

    const current = (weatherJson.current ?? weatherJson.current_weather) as Record<string, number>;
    const temperature = current?.temperature_2m ?? current?.temperature;
    const weatherCode = current?.weather_code ?? current?.weathercode;

    const address = (locationJson?.address ?? {}) as Record<string, string>;
    const cityName =
      address.city || address.town || address.village ||
      address.municipality || address.county || address.state_district ||
      (locationJson?.name as string | undefined);
    const regionName = address.state || address.region || address.county;
    const placeLabel = [cityName, regionName].filter(Boolean).join(", ");
    const coordinateLabel = `${Number(lat).toFixed(2)}°, ${Number(lon).toFixed(2)}°`;

    const result = {
      summary: `${Math.round(temperature as number)}°C ${WEATHER_LABELS[weatherCode as number] ?? "Current Conditions"}`,
      location: placeLabel ? `Closest city ${placeLabel}` : "Closest city unavailable",
      detail: `Coordinates ${coordinateLabel}`,
    };

    return new Response(JSON.stringify(result), {
      status: 200,
      headers: {
        "content-type": "application/json",
        "cache-control": "public, max-age=600",
      },
    });
  } catch {
    const coordinateLabel = `${Number(lat).toFixed(2)}°, ${Number(lon).toFixed(2)}°`;
    return new Response(
      JSON.stringify({
        summary: "Weather unavailable",
        location: "Closest city unavailable",
        detail: `Coordinates ${coordinateLabel}`,
      }),
      { status: 200, headers: { "content-type": "application/json" } },
    );
  }
};
