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

      try {
        const response = await fetch(
          `/api/weather?lat=${latitude}&lon=${longitude}`,
        );
        if (!response.ok) throw new Error(`${response.status}`);
        const data = await response.json();
        if (!cancelled) setWeather(data);
      } catch {
        if (!cancelled) {
          setWeather({
            summary: "Weather unavailable",
            location: "Closest city unavailable",
            detail: `Coordinates ${latitude.toFixed(2)}°, ${longitude.toFixed(2)}°`,
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
      (position) => loadWeather(position),
      () => {
        if (!cancelled) {
          setWeather({
            summary: "Location not shared",
            location: "Closest city unavailable",
            detail: "Allow browser location access to show local weather",
          });
        }
      },
      { enableHighAccuracy: false, timeout: 8000, maximumAge: 15 * 60 * 1000 },
    );

    return () => { cancelled = true; };
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
