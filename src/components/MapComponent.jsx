import React from "react";
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "leaflet/dist/leaflet.css";
import indonesiaGeoJSON from "../38provinsi-indonesia.json";
import { Dialog, DialogActions, DialogContent, DialogTitle, Button } from "@mui/material";
import BottomSheet from "./BottomSheet";
import { Box, Typography } from "@mui/material";

export default function MapComponent({ scrollToSection, openDrawer, onEachProvince }) {
    return (
        <Box sx={{ flex: 1, height: `calc(100vh - 56px)`, overflow: "hidden", backgroundColor: "lightgray" }}>
            <MapContainer 
                center={[-2.5489, 118.0149]} 
                zoom={5} 
                style={{ height: "100%", width: "100%" }}
                tap={true}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <GeoJSON 
                    data={indonesiaGeoJSON} 
                    onEachFeature={onEachProvince} 
                    style={{ fillColor: "blue", fillOpacity: 0.5, color: "white", weight: 1 }} 
                />
            </MapContainer>

            {/* Modal MUI */}
            {/* <Dialog open={!!selectedProvince} onClose={() => setSelectedProvince(null)}>
                <DialogTitle>Provinsi {selectedProvince}</DialogTitle>
                <DialogContent>Anda ingin melihat budaya dari provinsi ini?</DialogContent>
                <DialogActions>
                    <Button onClick={() => setSelectedProvince(null)} color="error">
                        Batal
                    </Button>
                    <Button onClick={handleConfirm} color="primary" variant="contained">
                        OK
                    </Button>
                </DialogActions>
            </Dialog> */}


        </Box>
    )
}