import React, { useRef, useState } from 'react';
import { Box, Typography } from "@mui/material";
import MapComponent from "../components/MapComponent";
import { Link, Element, scroller } from 'react-scroll';
import SwipeableTemporaryDrawer from "../components/SwipeableTemporaryDrawer";

export default function Materi() {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [selectedProvince, setSelectedProvince] = useState(null);

    const scrollToSection = (sectionName, duration = 700) => {
        scroller.scrollTo(sectionName, {
          smooth: true,
          duration: duration,
        });
    };

    const handleDrawerOpen = () => {
        setIsDrawerOpen(true);
    };

    const onEachProvince = (feature, layer) => {
        layer.on("click", () => {
            setSelectedProvince(feature.properties.KODE_PROV); // Set provinsi ke modal
            handleDrawerOpen()
        });
        layer.bindTooltip(feature.properties.PROVINSI, { permanent: false, interactive: true });
    };
    

    return (
        <Box maxWidth="xs" sx={{ display: "flex", flexDirection: "column" }}>
            <Element name="section1" height={"100vh"}>
                <MapComponent scrollToSection={scrollToSection} openDrawer={handleDrawerOpen} onEachProvince={onEachProvince} />
            </Element>
            <SwipeableTemporaryDrawer open={isDrawerOpen} setOpen={setIsDrawerOpen} selectedProvince={selectedProvince}/>
        </Box>
    );
};
