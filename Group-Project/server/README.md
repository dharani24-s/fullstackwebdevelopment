# Server

TravelMate is a frontend-only app and has no backend. Users, sessions, favourites and trips are kept in the browser's `localStorage` (keys `tm_users`, `tm_session`, `tm_favourites`, `tm_trips`, `tm_theme`), and destination search calls the public OpenStreetMap Nominatim API directly from the client.

This folder is kept so the project matches the required structure. A Node + Express + MongoDB API can be added here later without changing the client layout.
