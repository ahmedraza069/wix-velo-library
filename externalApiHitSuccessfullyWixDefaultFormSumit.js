import wixData from 'wix-data';
import { fetch } from 'wix-fetch';

const API_BASE = "https://orebi.pixelstack.cloud/api";

const ACCESS_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSIsInN1YiI6ImNtb2s5bmRsejAwMDBsMHdxcWNveWFtMnAiLCJ0eXBlIjoidXNlciIsImlhdCI6MTc4MjM3NzUwMCwiZXhwIjoxNzgzMjQxNTAwfQ.y6m_nFM3Q4LMwHR91xx9Cv_CFImqISZk7of_xi1uew4";

$w.onReady(function () {

    $w("#form1").onSubmit(async (event) => {

        const dataToSave = {
            "firstName": event.first_name,
            "lastName": event.last_name,
            "phone": event.phone,
            "email": event.email,
            "message": event.message,
        };

        wixData.insert("Info", dataToSave).catch(console.error);

        try {
            const res = await fetch(`${API_BASE}/auth/me`, {
                method: "GET",
                headers: {
                    "Accept": "*/*",
                    "Authorization": `Bearer ${ACCESS_TOKEN}`
                }
            });

            const result = await res.json();
            console.log("Profile Data:", result);

        } catch (err) {
            console.error("API error:", err);
        }
    });
});