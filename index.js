const { addonBuilder, serveHTTP } = require("stremio-addon-sdk");

const manifest = {
  id: "org.nic.sportsaddon",
  version: "1.0.0",
  name: "NixRedirect",
  description: "Redirects to live sports",
  resources: ["catalog", "meta", "stream"],
  types: ["NixRedirect"], // 🛠 custom type instead of "tv"
  catalogs: [
    {
      type: "NixRedirect", // match this type
      id: "sports_live",
      name: "Live Sports"
    }
  ],
  idPrefixes: ["sports"]
};

const builder = new addonBuilder(manifest);

builder.defineCatalogHandler(() => {
  return Promise.resolve({
    metas: [
      {
        id: "sports_ufc",
        type: "NixRedirect", // 👈 match custom type
        name: "Nix Redirect V1.0",
        poster: "https://raw.githubusercontent.com/nix1003/stremioaddons/main/nixredirectbackdrop.png",
        posterShape: "landscape",
        description: "Watch Live Sports, including PPV UFC. Custom made by NicModz"
      }
    ]
  });
});

builder.defineMetaHandler(({ id }) => {
  const titles = {
    "sports_ufc": "Nix Redirect"
  };
  return Promise.resolve({
    meta: {
      id,
      type: "NixRedirect", // 👈 match custom type
      name: titles[id] || "Sports Event",
      poster: "https://raw.githubusercontent.com/nix1003/stremioaddons/main/nixredirectbackdrop.png",
      posterShape: "landscape",
      description: "Redirects to various streaming sites. It uses the device's default browser to open links."
    }
  });
});

builder.defineStreamHandler(({ id }) => {
  const links = {
    "sports_ufc": [
      {
        title: "UFC - Stream East",
        externalUrl: "https://the.streameast.app/mmastreams10"
      },
      {
        title: "UFC - Crack Streams",
        externalUrl: "https://crackstreams.cx/mmastreams/live"
      },
      {
        title: "UFC - Olympic Streams",
        externalUrl: "https://olympicstreams.co/live/fighting-stream"
      }
    ]
  };

  return Promise.resolve({
    streams: links[id] || []
  });
});

serveHTTP(builder.getInterface(), { port: 7000 });
