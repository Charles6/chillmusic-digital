import React, { useEffect, useState } from "react";
import {
  ZenDate,
  ZenHint,
  ZenNewsCard,
  ZenNewsDescription,
  ZenNewsHeadline,
  ZenNewsMeta,
  ZenNewsRail,
  ZenPlaying,
  ZenScreen,
  ZenTime,
  ZenWeather,
  ZenWeatherLocation,
  ZenWeatherMeta,
  ZenWeatherSummary,
} from "./styles";

const WEATHER_LABELS = {
  0: "Clear",
  1: "Mostly Clear",
  2: "Partly Cloudy",
  3: "Cloudy",
  45: "Fog",
  48: "Rime Fog",
  51: "Light Drizzle",
  53: "Drizzle",
  55: "Heavy Drizzle",
  56: "Freezing Drizzle",
  57: "Heavy Freezing Drizzle",
  61: "Light Rain",
  63: "Rain",
  65: "Heavy Rain",
  66: "Freezing Rain",
  67: "Heavy Freezing Rain",
  71: "Light Snow",
  73: "Snow",
  75: "Heavy Snow",
  77: "Snow Grains",
  80: "Rain Showers",
  81: "Heavy Showers",
  82: "Violent Showers",
  85: "Snow Showers",
  86: "Heavy Snow Showers",
  95: "Thunderstorm",
  96: "Thunder and Hail",
  99: "Severe Thunderstorm",
};

function getWeatherLabel(code) {
  return WEATHER_LABELS[code] ?? "Current Conditions";
}

function useLocalWeather() {
  const [weather, setWeather] = useState({
    summary: "Checking local weather...",
    location: "Finding nearest city...",
    detail: "Allow location access for local conditions",
  });

  useEffect(() => {
    let cancelled = false;

    async function loadWeather(position) {
      const { latitude, longitude } = position.coords;
      const coordinateLabel = `${latitude.toFixed(2)}°, ${longitude.toFixed(2)}°`;
      const weatherUrl =
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}` +
        "&current=temperature_2m,weather_code&current_weather=true&temperature_unit=celsius";
      const locationUrl =
        `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}` +
        "&format=jsonv2&zoom=10&addressdetails=1&accept-language=en";

      try {
        const [weatherResponse, locationResult] = await Promise.all([
          fetch(weatherUrl),
          fetch(locationUrl).catch(() => null),
        ]);

        if (!weatherResponse.ok) {
          throw new Error(`Weather request failed with ${weatherResponse.status}`);
        }

        const weatherJson = await weatherResponse.json();
        const locationJson = locationResult?.ok ? await locationResult.json() : null;
        const current = weatherJson.current ?? weatherJson.current_weather;
        const temperature = current?.temperature_2m ?? current?.temperature;
        const weatherCode = current?.weather_code ?? current?.weathercode;
        const address = locationJson?.address ?? {};
        const cityName =
          address.city ||
          address.town ||
          address.village ||
          address.municipality ||
          address.county ||
          address.state_district ||
          locationJson?.name;
        const regionName = address.state || address.region || address.county;
        const placeLabel = [cityName, regionName].filter(Boolean).join(", ");

        if (cancelled || temperature === undefined || weatherCode === undefined) {
          return;
        }

        setWeather({
          summary: `${Math.round(temperature)}°C ${getWeatherLabel(weatherCode)}`,
          location: placeLabel ? `Closest city ${placeLabel}` : "Closest city unavailable",
          detail: `Coordinates ${coordinateLabel}`,
        });
      } catch {
        if (!cancelled) {
          setWeather({
            summary: "Weather unavailable",
            location: "Closest city unavailable",
            detail: `Coordinates ${coordinateLabel}`,
          });
        }
      }
    }

    if (!("geolocation" in navigator)) {
      setWeather({
        summary: "Weather unavailable",
        location: "Closest city unavailable",
        detail: "This browser does not support location access",
      });
      return undefined;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        loadWeather(position);
      },
      () => {
        if (!cancelled) {
          setWeather({
            summary: "Location not shared",
            location: "Closest city unavailable",
            detail: "Allow browser location access to show local weather",
          });
        }
      },
      {
        enableHighAccuracy: false,
        timeout: 8000,
        maximumAge: 15 * 60 * 1000,
      }
    );

    return () => {
      cancelled = true;
    };
  }, []);

  return weather;
}

function DigitalClock() {
  const [now, setNow] = useState(() => new Date());
  const weather = useLocalWeather();

  useEffect(() => {
    const intervalId = window.setInterval(() => setNow(new Date()), 60000);
    return () => window.clearInterval(intervalId);
  }, []);

  const hh = String(now.getHours()).padStart(2, "0");
  const mm = String(now.getMinutes()).padStart(2, "0");
  const date = now.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <>
      <ZenTime>{hh}:{mm}</ZenTime>
      <ZenDate>{date}</ZenDate>
      <ZenWeather>
        <ZenWeatherSummary>{weather.summary}</ZenWeatherSummary>
        <ZenWeatherLocation>{weather.location}</ZenWeatherLocation>
        <ZenWeatherMeta>{weather.detail}</ZenWeatherMeta>
      </ZenWeather>
    </>
  );
}

function ZenNewsTicker({ items }) {
  const newsItems = items.filter((item) => item?.title && item?.link);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (newsItems.length <= 1) {
      return undefined;
    }

    const intervalId = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % newsItems.length);
    }, 7000);

    return () => window.clearInterval(intervalId);
  }, [newsItems.length]);

  useEffect(() => {
    if (activeIndex >= newsItems.length) {
      setActiveIndex(0);
    }
  }, [activeIndex, newsItems.length]);

  if (!newsItems.length) {
    return (
      <ZenNewsRail>
        <ZenNewsCard
          href="https://www.reuters.com/world/"
          target="_blank"
          rel="noreferrer"
          onClick={(event) => event.stopPropagation()}
        >
          <ZenNewsMeta>Reuters / BBC / AP</ZenNewsMeta>
          <ZenNewsHeadline>News feed is warming up</ZenNewsHeadline>
          <ZenNewsDescription>
            I could not load the Reuters, BBC, and Associated Press headlines for this
            session. Refresh the page in a moment and the zen card should try again.
          </ZenNewsDescription>
        </ZenNewsCard>
      </ZenNewsRail>
    );
  }

  const item = newsItems[activeIndex];

  return (
    <ZenNewsRail>
      <ZenNewsCard
        key={`${item.link}-${activeIndex}`}
        href={item.link}
        target="_blank"
        rel="noreferrer"
        onClick={(event) => event.stopPropagation()}
      >
        <ZenNewsMeta>{item.source || "World News"}</ZenNewsMeta>
        <ZenNewsHeadline>{item.title}</ZenNewsHeadline>
        <ZenNewsDescription>
          {item.description || "Open the story to read the full article."}
        </ZenNewsDescription>
      </ZenNewsCard>
    </ZenNewsRail>
  );
}

export default function ZenMode({ isPlaying, items, onExit }) {
  return (
    <ZenScreen onClick={onExit}>
      {isPlaying && <ZenPlaying>● Playing</ZenPlaying>}
      <ZenNewsTicker items={items} />
      <DigitalClock />
      <ZenHint>click anywhere to return</ZenHint>
    </ZenScreen>
  );
}
