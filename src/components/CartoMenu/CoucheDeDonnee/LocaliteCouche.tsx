import { Accordion, AccordionDetails, AccordionSummary, Box, Checkbox, LinearProgress, Stack, Typography } from "@mui/joy";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../../providers";
import { LOADING_STATE_T, LOCALITE_REGION_T, SHAPE_OBJECT_T } from "types";
import { getAllRegion } from "functions/API/region/getAll";

const LocaliteCouche = () => {
    const {
        coucheDeDonneesSelectedListe,
        setlegendeSection,
        setlocaliteRegionsSelected,
        setlocaliteDepartementsSelected,
        setlocaliteArrondissementsSelected,
        setlocaliteCommunesSelected,
        setlocaliteVillagesSelected
    } = useContext(AppContext);

    const [data, setdata] = useState<LOCALITE_REGION_T[]>([]);
    const [loadingState, setloadingState] = useState<LOADING_STATE_T>(null);

    /** Charger les couches depuis l'API */
    const loadData = async () => {
        try {
            setloadingState("En cours de chargement");
            const res = await getAllRegion();
            if (res) {
                setdata(res);
            }
        } catch (error) {
            console.error("Erreur lors du chargement des couches", error);
        } finally {
            setloadingState(null);
        }
    };

    /** Toggle (activer/désactiver) une couche */
    const toogleElementInCoucheDonnesListe = (
        element: any,
        type: 'region' | 'departement' | 'arrondissement' | 'commune' | 'village'
    ) => {
        switch (type) {

            case 'region':
                setlocaliteRegionsSelected((prev: any) => {
                    const exists = prev.find((item: any) => item.code_region === element.code_region);
                    if (exists) {
                        return prev.filter((item: any) => item.code_region !== element.code_region);
                    } else {
                        return [...prev, element];
                    }
                });
                break;

            case 'departement':
                setlocaliteDepartementsSelected((prev: any) => {
                    const exists = prev.find((item: any) => item.code_departement === element.code_departement);
                    if (exists) {
                        return prev.filter((item: any) => item.code_departement !== element.code_departement);
                    } else {
                        return [...prev, element];
                    }
                });
                break;

            /** -------------------- AJOUT DE L’ARRONDISSEMENT -------------------- */
            case 'arrondissement':
                setlocaliteArrondissementsSelected((prev: any) => {
                    const exists = prev.find((item: any) => item.code_arrondissement === element.code_arrondissement);
                    if (exists) {
                        return prev.filter((item: any) => item.code_arrondissement !== element.code_arrondissement);
                    } else {
                        return [...prev, element];
                    }
                });
                break;

            case 'commune':
                setlocaliteCommunesSelected((prev: any) => {
                    const exists = prev.find((item: any) => item.code_commune === element.code_commune);
                    if (exists) {
                        return prev.filter((item: any) => item.code_commune !== element.code_commune);
                    } else {
                        return [...prev, element];
                    }
                });
                break;

            case 'village':
                setlocaliteVillagesSelected((prev: any) => {
                    const exists = prev.find((item: any) => item.code_village === element.code_village);
                    if (exists) {
                        return prev.filter((item: any) => item.code_village !== element.code_village);
                    } else {
                        return [...prev, element];
                    }
                });
                break;

            default:
                break;
        }
    };



    /** Charger au montage */
    useEffect(() => {
        loadData();
    }, []);

    if (loadingState) {
        return (
            <LinearProgress />
        )
    }

    return (
        <Stack gap={1} >
            {data.map((region, index) => (
                <Accordion
                    key={index}
                    sx={{ fontSize: 12, borderRadius: 5, p: 1 }}
                    variant="soft"
                >
                    <AccordionSummary
                        children={region.couche
                            ? (
                                <Checkbox
                                    label={region.nom_region.toLowerCase()}
                                    onClick={() => toogleElementInCoucheDonnesListe(region, 'region')}
                                />
                            )
                            : (
                                <Typography children={region.nom_region.toLowerCase()} />
                            )
                        }
                    />

                    <AccordionDetails>
                        {region.departements.map((departement, index) => (
                            <Accordion
                                key={index}
                                sx={{ ml: 1.5, pl: 1.5, borderLeft: `1px solid grey` }}
                            >
                                <AccordionSummary
                                    children={departement.couche
                                        ? (
                                            <Checkbox
                                                label={departement.nom_departement.toLowerCase()}
                                                onClick={() => toogleElementInCoucheDonnesListe(departement, 'departement')}
                                            />
                                        )
                                        : (
                                            <Typography children={departement.nom_departement.toLowerCase()} />
                                        )
                                    }
                                />

                                <AccordionDetails>

                                    {/* -------------------- ARRONDISSEMENTS -------------------- */}
                                    {departement.arrondissements.map((arrondissement, index) => (
                                        <Accordion
                                            key={index}
                                            sx={{ ml: 1.5, pl: 1.5, borderLeft: `1px solid grey` }}
                                        >
                                            <AccordionSummary
                                                children={arrondissement.couche
                                                    ? (
                                                        <Checkbox
                                                            label={arrondissement.nom_arrondissement.toLowerCase()}
                                                            onClick={() => toogleElementInCoucheDonnesListe(arrondissement, 'arrondissement')}
                                                        />
                                                    ) : (
                                                        < Typography children={arrondissement.nom_arrondissement.toLowerCase()} />
                                                    )
                                                }
                                            />

                                            <AccordionDetails>

                                                {/* -------------------- COMMUNES -------------------- */}
                                                {arrondissement.communes.map((commune, index) => (
                                                    <Accordion
                                                        key={index}
                                                        sx={{ ml: 1.5, pl: 1.5, borderLeft: `1px solid grey` }}
                                                    >
                                                        <AccordionSummary
                                                            children={commune.couche
                                                                ? (
                                                                    <Checkbox
                                                                        label={commune.nom_commune.toLowerCase()}
                                                                        onClick={() => toogleElementInCoucheDonnesListe(commune, 'commune')}
                                                                    />
                                                                )
                                                                : (
                                                                    < Typography children={commune.nom_commune.toLowerCase()} />
                                                                )
                                                            }
                                                        />

                                                        <AccordionDetails>
                                                            {/* -------------------- VILLAGES -------------------- */}
                                                            <Stack
                                                                key={index}
                                                                sx={{ ml: 1.5, pl: 1.5, borderLeft: `1px solid grey` }}
                                                                gap={1}
                                                            >
                                                                {commune.villages.map((village, index) => (
                                                                    village.couche
                                                                        ? (
                                                                            <Checkbox
                                                                                key={index}
                                                                                label={village.nom_village.toLowerCase()}
                                                                                onClick={() => toogleElementInCoucheDonnesListe(village, 'village')}
                                                                            />
                                                                        )
                                                                        : (
                                                                            < Typography children={village.nom_village.toLowerCase()} />
                                                                        )
                                                                ))}
                                                            </Stack>
                                                        </AccordionDetails>
                                                    </Accordion>
                                                ))}

                                            </AccordionDetails>
                                        </Accordion>
                                    ))}

                                </AccordionDetails>

                            </Accordion>
                        ))}
                    </AccordionDetails>

                </Accordion>
            ))}

        </Stack>
    );
};

export default LocaliteCouche;
