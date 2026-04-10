flowchart LR
subgraph input["Input"]
subgraph constants[Konstanten]
const_assumed_floor_height["Raumhöhe (hg) [Fix]"]
const_assumed_roof_thickness["Deckendicke (hd) [Fix]"]
const_HDD["Heizgradtage (HDD) [Fix]"]

        const_eH["Energie-Aufwandszahl Heizung (eH) [EA]"]
        const_ehce0["Energie-Aufwandszahl Regelung Flächenheizung (ehce0) [EA]"]
        const_ehce1["Energie-Aufwandszahl Regelung freie Heizflächen (ehce1) [EA]"]
        %%const_ehce2 always zero?
        const_ehce2["Energie-Aufwandszahl Heizung2 (ehce2) [EA]"]
        %%const_Th["Heizkreistemperatur (Th) [EA]"]

        subgraph roof[Konstanten Dach]
            const_F_Dach["Faktor für Ht_Dach (F_Dach) [Fix]"]
            const_Rsi_Dach["Wärmeübergangswiderstand (Rsi_Dach) [Fix]"]
            const_Sr_Dach["Dicke der Dämmung (Sr_Dach) [Fix]"]
            const_L_Dach["Wärmeleitfähigkeit Dach (L_Dach) [Fix]"]
            const_Rse_Dach["Wärmeübergangswiderstand (Rse_Dach) [Fix]"]
            const_Fmin_Dach["Minderungsfaktor Dach (Fmin_Dach) [Fix]"]
        end

        subgraph roof_windows[Konstanten Dachfenster]
            const_F_Dachfenster["Faktor für Ht_Dachfenster (F_Dachfenster) [Fix]"]
        end

        subgraph top_floor[Konstanten OGD]
            const_F_OGD["Faktor für Ht_OGD (F_OGD) [Fix]"]
            const_Rsi_OGD["Wärmeübergangswiderstand OGD (Rsi_OGD) [Fix]"]
            const_Sr_OGD["Dicke der Dämmung (Sr_OGD) [Fix]"]
            const_L_OGD["Wärmeleitfähigkeit OGD (L_OGD) [Fix]"]
            const_Rse_OGD["Wärmeübergangswiderstand (Rse_OGD) [Fix]"]
        end

        subgraph exterior_walls[Konstanten Aussenwand]
            const_F_Aussenwand["Faktor für Ht_Aussenwand (F_Aussenwand) [Fix]"]
            const_Rsi_Aussenwand["Wärmeübergangswiderstand Aussenwand (Rsi_Aussenwand) [Fix]"]
            const_Sr_Aussenwand["Dicker der Dämmung (Sr_Aussenwand) [Fix]"]
            const_L_Aussenwand["Wärmeleitfähigkeit Aussenwand (L_Aussenwand) [Fix]"]
            const_Rse_Aussenwand["Wärmeübergangswiderstand (Rse_Aussenwand) [Fix]"]
        end

        subgraph exterior_wall_windows[Konstanten Aussenwandfenster]
            const_F_Aussenwandfenster["Faktor für Ht_Aussenwandfenster (F_Aussenwandfenster) [Fix]"]
        end

        subgraph bottom_floor[Konstanten UGD]
            const_F_UGD["Faktor für Ht_UGD (F_UGD) [Fix]"]
            const_Rsi_UGD["Wärmeübergangswiderstand (Rsi_OGD) [Fix]"]
            const_Sr_UGD["Dicke der Dämmung (Sr_UGD) [Fix]"]
            const_L_UGD["Wärmeleitfähigkeit UGD (L_UGD) [Fix]"]
            const_Rse_UGD["Wärmeübergangswiderstand (Rse_UGD) [Fix]"]
        end

        const_fp["Primärenergiefaktor (fp) [ET]"]
        const_xco2["CO2 Faktor (xco2) [ET]"]
        const_bheiz["Brennstoff Heizwert (bheiz) [ET]"]
        const_barb["Brennstoff Arbeitspreis (barb) [ET]"]
        const_bgrund["Brennstoff Grundpreis (bgrund) [ET]"]

        const_kVl["Korrekturwert Vl (kVl) [f]"]
        const_kAn["Korrekturwert An (kAn) [Fix]"]
        const_kAngf["Korrekturwert Angf (kAngf) [type, hk]"]
        const_kHv["Korrekturwert Hv (kHv) [Fix]"]
        const_nHv["Fixwert für W.Kap und Dichte von Luft (nHv) [Fix]"]
        const_kQwb["Faktor Angf zu Qwb (kQwb) [type]"]
        const_kQhn["Fixwert für Qhn (kQhn) [Fix]"]
        const_kQi["Fixwert für Qi (kQi) [Fix]"]
        const_qi["Korrekturwert Qi (qi) [type]"]
    end

    subgraph LOD2
        lod2_base_area["Grundfläche (Ag)"]
        lod2_building_year["Gebäude Baujahr (Bg)"]
        lod2_district_heating_possible["Fernwärmeanschluss möglich? [Fw]"]
        lod2_exterior_walls_area["Aussenwandfläche (A_Aussenwand)"]
        lod2_exterior_walls_windows_area["Aussenwandfensterfläche (A_Aussenwandfenster)"]
        lod2_gas_exists["Gasanschluss vorhanden (Gv)"]
        %%lod2_geothermal_possible["Geothermie-Anlage möglich? Ja oder Nein (Gt)"]
        lod2_roof_area["Dachfläche ohne Fenster (A_Dach)"]
        lod2_roof_windows_area["Dachfensterfläche (A_Dachfenster)"]
        lod2_solar_possible["Photovoltaik-Anlage möglich? (Pv)"]
        lod2_total_height["Höhe (h)"]
    end

    subgraph User["Nutzereingaben"]
        subgraph UserBuilding["Gebäude"]
            user_building_area["Gebäude Wohnfläche m² (Agn)"]
            user_building_floors["Vollgeschosse (f)"]
            user_building_type["Ein oder Mehrfamilienhaus (type)"]
            user_building_units["Gebäude Wohneinheiten (Ngn)"]
            user_building_year["Gebäude Baujahr (Bgn)"]
        end

        subgraph UserDach["Dach"]
            user_roof_area["Dachfläche (A_Dach)"]
            user_roof_insulation_thickness["Dicke der Dämmung Dach (Sr_Dach)"]
            user_roof_insulation_type["Art der Dämmung Dach: Aufdach oder Zwischensparren? (Dach_Dämmung_Art)"]
            user_roof_is_heated["Dachraum beheizt oder unbeheizt? (Dach_beheizt)"]
            user_roof_is_insulated["Dämmung Dach vorhanden? (Dach_Dämmung)"]
            user_roof_renovation["Dachsanierung ausgewählt? (Sanierung_Dach)"]
            user_roof_type["Konstruktion Dach: Massivdach oder Holzdach? (Dach_massiv)"]
            user_roof_year["Dach Baujahr (Bg_Dach)"]
        end

        subgraph UserDachfenster["Dachfenster"]
            user_roof_window_area["Dachfensterfläche (A_Dachfenster)"]
            user_roof_window_frame["Dachfenster Rahmenart (Dachfenster_Rahmen)"]
            user_roof_window_glass["Dachfenster Glasart (Dachfenster_Glas)"]
            user_roof_window_year["Dachfenster Baujahr (Bg_Dachfenster)"]
        end

        subgraph UserOGD["OGD"]
            user_top_floor_area["Fläche OGD (A_OGD)"]
            user_top_floor_insulation_thickness["Dicke der Dämmung OGD (Sr_OGD)"]
            user_top_floor_is_insulated["Dämmung OGD vorhanden? (OGD_Dämmung)"]
            user_top_floor_type["Konstruktion OGD: Massivdecke oder Holzbalkendecke? (OGD_massiv)"]
            user_top_floor_year["Oberste Geschossdecke Baujahr (Bg_OGD)"]
        end

        subgraph UserAussenwand["Aussenwand"]
            user_exterior_wall_area["Aussenwandfläche (A_Aussenwand)"]
            user_exterior_wall_insulation_thickness["Dicke der Dämmung Aussenwand (Sr_Aussenwand)"]
            user_exterior_wall_is_insulated["Dämmung Aussenwand vorhanden? (Aussenwand_Dämmung)"]
            user_exterior_wall_type["Konstruktion Aussenwand: Massivwand mit WDVS, 0,20 W/m²K<br/><br/>Sonstige Wandaufbauten über 20 cm<br/><br/>Über 30 cm Wandstärke (K_Aussenwand)"]
            user_exterior_wall_year["Aussenwand Baujahr (Bg_Aussenwand)"]
        end

        subgraph UserAussenwandfenster["Aussenwandfenster"]
            user_exterior_wall_window_area["Aussenwandfensterfläche (A_Aussenwandfenster)"]
            user_exterior_wall_window_frame["Aussenwandfenster Rahmenart (Aussenwandfenster_Rahmen)"]
            user_exterior_wall_window_glass["Aussenwandfenster Glasart (Aussenwandfenster_Glas)"]
            user_exterior_wall_window_year["Aussenwandfenster Baujahr (Bg_Aussenwandfenster)"]
        end

        subgraph UserUGB[UGB]
            user_basement_is_heated["Keller beheizt (Keller_beheizt)"]
            user_basement_type["Kellerdecke Stahlbeton massiv oder Holzbalkendecke (Keller_massiv)"]
            user_bottom_floor_area["Fläche UGD (A_UGD)"]
            user_bottom_floor_insulation_thickness["Dicke der Dämmung UGD (Sr_UGD)"]
            user_bottom_floor_is_insulated["Dämmung UGB vorhanden? (UGD_Dämmung)"]
            user_bottom_floor_year["Unterste Geschossdecke Baujahr (Bg_UGD)"]
        end

        subgraph UserHeating["Heizung"]
            user_heating_additional_solar["Zusatzheizung Solarthermie WWB oder WWB + Heizung (Zs)"]
            user_heating_additional_biomass["Zusatzheizung Biomasse Pellets oder Scheitholz (Zb)"]
            user_heating_cost["Heizung Energiepreis €/kWH (Hep)"]
            user_heating_device["Heizung Erzeugerart (EA)"]
            user_heating_energy_carrier["Heizung Energieträger (ET)"]
            user_heating_storage["Brennstofflagerfläche vorhanden? (Lf)"]
            user_heating_surface["Umbau zu Flächenheizung erwünscht? (Fl)"]
            user_heating_type["Heizflächenart (Hfa)"]
            user_heating_warm_water_yearly_consumption["Jahresverbrauch Warmwasser (Wwv)"]
            user_heating_year["Heizung Baualter (Bah)"]
            user_heating_yearly_consumption["Heizung Jahresverbrauch kWh/a (Hev)"]
        end

        subgraph UserPowerRenewables["Strom und erneuerbare Energien"]
            user_power_solar_exists["Photovoltaik vorhanden? (Pvn)"]
            user_power_yearly_consumption["Strom Jahresverbrauch kWh/a (Pva)"]
            user_power_type["Strom Erzeugerart (Pe)"]
            user_power_cost["Strompreis €/kWh (Pp)"]
        end
    end

    subgraph Estimations["Schätzungen"]
        est_floors["Geschosse = (Niedrigste Traufe des Gebäudes - Höhe Grund) / hg"]
    end

end

subgraph calc["Berechnungen"]
subgraph calcMain["Berechnungen Hauptteil"]
he["Geschosshöhen he = f*hg + (f-1) * hd"]
%%Ve["Beheiztes Gebäudevolumen<br/><br/>Wenn Dachraum beheizt ist -> lod2_building_volume<br/><br/>Wenn Dachraum nicht beiheizt ist -> Ve = Ah * he"]
Ve["Beheiztes Gebäudevolumen Ve = Ah * he"]
f --> he
hg --> he
hd --> he

        he --> Ve
        Ah --> Ve

        Vl["Beheiztes Luftvolumen Vl = kVl * Ve "]
        kVl["Bis zu 3 Vollgeschosse: kVl = 0,76<br/><br/>Übrige Fälle: kVl = 0,80"] --> Vl
        Ve --> Vl

        An["Nutzfäche beheiztes Gebäudevolumen An = Ve * kAn"]
        Ve --> An
        kAn --> An

        Angf["Nettogrundfläche Angf = An * kAngf"]
        An --> Angf
        kAngf --> Angf

        %% Alternativ Angf Formel = Awohn * 1.1

        Hv["Lüftungswärmeverlust Hv = nHv * kHv * Vl"]
        kHv --> Hv
        nHv --> Hv
        Vl --> Hv

        H["Gesamtwärmeverlust H = Hv + SHt"]
        SHt --> H
        Hv --> H

        Qwb["E.Bedarf Trinkwarmwasser Qwb = Angf * kQwb"]
        Angf --> Qwb
        kQwb --> Qwb

        %% Alternativ Direkteingabe
        subgraph total_energy_cost["Direkteingabe Gesamtenergiekosten"]
            Hecost["Endenergiekosten €/a"]
            Hep["Heizenergiepreis €/kWh"] --> Hecost
            Eev --> Hecost

            subgraph heating_cost["Endenergieverbrauch"]
                Eev["Endenergieverbrauch Eev = Hev + Wwv"]
                Hev --> Eev
                Wwv --> Eev
            end
        end

        Qhn["Vorl. Heizwärmebedarf Qhn = H * HDD * kQhn"]
        H --> Qhn
        kQhn --> Qhn
        HDD --> Qhn

        Qi["Interne Gewinne Qi = qi * Angf * kQi"]
        Angf --> Qi
        qi --> Qi
        kQi --> Qi

        Qh["Heizwärmebedarf Qh = Qhn - Qi"]
        Qhn --> Qh
        Qi --> Qh

        eges["Gesamte Aufwandszahl eges = eH * (ehce0 + ehce1 + ehce2)"]
        eH --> eges
        ehce0 --> eges
        ehce1 --> eges
        ehce2 --> eges
        An --> eH
        Bah --> eH
        EA --> eH
        Th --> eH
        Bah --> ehce0
        EA --> ehce0
        Th --> ehce0
        Hfa --> ehce0
        Bah --> ehce1
        EA --> ehce1
        Th --> ehce1
        Hfa --> ehce1
        Bah --> ehce2
        EA --> ehce2
        Th --> ehce2

        Qf["Endenergiebedarf Qf = Qh(Qhn) * eges + Qwb<br/><br/>Wenn stattdessen Nutzereingabe zu Verbrauch vorliegt: siehe Subgraph Direkteingabe "Endenergieverbrauch""]
        Qwb --> Qf
        Qh --> Qf
        eges --> Qf

        Qp["Primärenergiebedarf Qp = Qf * fp"]
        Qf --> Qp
        fp --> Qp

        qf["Endenergiebedarf/m² qf = Qf / An"]
        Qf --> qf
        An --> qf

        qp["Primärenergiebedarf/m² qp = Qp / An"]
        Qp --> qp
        An --> qp

        mco2["Co2-äquivalente Emissionen mco2 = Qf * xco2"]
        Qf --> mco2
        xco2 --> mco2

        Bverb["Brennstoffverbrauch Bverb = Qf / bheiz"]
        Qf --> Bverb
        bheiz --> Bverb

        Bcost["Brennstoffkosten Bcost = Bverb * barb + bgrund"]
        Bverb --> Bcost
        barb --> Bcost
        bgrund --> Bcost
    end

    subgraph calcHt["Berechungen Ht Einzelkomponenten"]
        SHt["Summe Wärmeverluste Gebäudeteile SHt = Ht_Dach + Ht_Dachfenster + Ht_OGD + Ht_Aussenwand + Ht_Aussenwandfenster + Ht_UGD"]

        subgraph calcHt_Common["Mehrfach verwendete Komponenten"]
            Bg
            Dach_beheizt
            Dach_massiv
        end

        subgraph calcHt_Dach["Berechnung Ht Dach"]
            Bg_Dach --> Sanierung_Dach_Empfehlung
            Dach_Dämmung --> Sr_Dach
            Dach_Dämmung_Art --> Fmin_Dach
            Dach_massiv --> U_Dach0
            Dach_massiv --> Rt_Dach
            Dach_massiv --> Fmin_Dach
            F_Dach["F_Dach = 1,00"] --> Ht_Dach

            subgraph result_Ht_Dach["Ht_Dach"]
                Ht_Dach["Transmissionsverluste Dach:<br/>Ht_Dach = F * U * A"]
            end

            subgraph calcHt_Dach0["Keine Nutzereingabe"]
                U_Dach0["U_Dach über Bg und Dach_massiv aus Kat. 1"] --> Ht_Dach
                A_Dach0["lod2_roof_area"] --> Ht_Dach
                Bg --> U_Dach0
            end

            subgraph calcHt_Dach1["Nutzereingabe"]
                U_Dach1["Wenn Nutzereingabe vorliegt:<br/>U_Dach = 1 / Rt_Dach"] --> Ht_Dach
                A_Dach1["A_Dach"] --> Ht_Dach

                Rt_Dach["Rt_Dach = Rsi_Dach + Sr_Dach / L_Dach + Rse_Dach * Fmin_Dach"] --> U_Dach1
                Rsi_Dach --> Rt_Dach
                Sr_Dach["Sr_Dach = 0,20 m"] --> Rt_Dach
                L_Dach["Lambda = 0,040 W/mK"] --> Rt_Dach
                Rse_Dach --> Rt_Dach
                Fmin_Dach["Minderungsfaktor<br/><br/>Wenn Zwischensparren -> Fmin_Dach = 0,30<br/><br/>Wenn Aufdach -> Fmin_Dach = 1,00"] --> Rt_Dach
            end

            subgraph calcHt_Dach2["Sanierung"]
                Sanierung_Dach_Empfehlung["Sanierungsempfehlung:<br/><20 Jahre -> keine Empfehlung<br/><br/>20-40 Jahre -> Empfehlung Dämmung<br/><br/>>40 Jahre -> Komplettsanierung"]
                Sanierung_Dach --> U_Dach2
                U_Dach2["U_Dach = 0,14 W/m²K"] --> Ht_Dach
                A_Dach2["Wenn Nutzereingabe vorliegt:<br/>A_Dach<br/><br/>Wenn keine Nutzereingabe vorliegt:<br/><br/>lod2_roof_area"] --> Ht_Dach
            end
        end

        subgraph calcHt_Dachfenster["Berechnung Ht Dachfenster"]
            Bg_Dachfenster --> U_Dachfenster1
            Bg_Dachfenster --> Sanierung_Dachfenster_Empfehlung
            Dachfenster_Glas --> U_Dachfenster0
            Dachfenster_Glas --> U_Dachfenster1
            Dachfenster_Rahmen --> U_Dachfenster0
            Dachfenster_Rahmen --> U_Dachfenster1
            F_Dachfenster["F_Dachfenster = 0,93"] --> Ht_Dachfenster

            subgraph result_Ht_Dachfenster["Ht_Dachfenster"]
                Ht_Dachfenster["Transmissionsverluste Dachfenster:<br/>Ht_Dachfenster = F * U * A"]
            end

            subgraph calcHt_Dachfenster0["Keine Nutzereingabe"]
                U_Dachfenster0["U_Dachfenster über Bg, Dachfenster_Glas und Dachfenster_Rahmen aus Kat. 1<br/><br/>>40 Jahre -> Holzfenster, zwei Scheiben<br/><br/><40 Jahre -> Kunsstofffenster, Isolierverglasung"] --> Ht_Dachfenster
                A_Dachfenster0["lod2_roof_windows_area"] --> Ht_Dachfenster
                Bg --> U_Dachfenster0
            end

            subgraph calcHt_Dachfenster1["Nutzereingabe"]
                U_Dachfenster1["Wenn U_Dachfenster als Nutzereingabe vorliegt -> direkt nutzen<br/><br/>Wenn U_Dachfenster nicht direkt vorliegt -> Über Bg_Dachfenster, Dachfenster_Rahmen und Dachfenster_Glas aus Kat. 1"] --> Ht_Dachfenster
                A_Dachfenster1["A_Dachfenster"] --> Ht_Dachfenster
            end

            subgraph calcHt_Dachfenster2["Sanierung"]
                Sanierung_Dachfenster_Empfehlung["Sanierungsempfehlung:<br/><30 Jahre -> keine Empfehlung<br/><br/>>30 Jahre -> Dachfenstertausch"]
                Sanierung_Dachfenster --> U_Dachfenster2
                U_Dachfenster2["U_Dachfenster = 1,00 W/m²K"] --> Ht_Dachfenster
                A_Dachfenster2["Wenn Nutzereingabe vorliegt:<br/>A_Dachfenster<br/><br/>Wenn keine Nutzereingabe vorliegt:<br/><br/>lod2_roof_windows_area"] --> Ht_Dachfenster
            end
        end

        subgraph calcHt_OGD["Berechnung Ht OGD"]
            Bg_OGD --> U_OGD_Decke
            Bg_OGD --> Sanierung_OGD_Empfehlung
            Dach_beheizt --> U_OGD0
            Dach_beheizt --> U_OGD_Decke
            Dach_massiv --> U_OGD0
            Dach_massiv --> U_OGD_Decke
            F_OGD["F_OGD = 1,00"] --> Ht_OGD
            OGD_Dämmung --> Sr_OGD

            subgraph result_Ht_OGD["Ht_OGD"]
                Ht_OGD["Transmissionsverluste OGD:<br/>Ht_OGD = F * U * A"]
            end

            subgraph calcHt_OGD0["Keine Nutzereingabe"]
                U_OGD0["U_OGD über Bg, Dach_beheizt und Dach_massiv aus Kat. 1<br/><br/><60 Jahre -> Massive Decke<br/><br/>>60 Jahre -> Holzbalkendecke"] --> Ht_OGD
                A_OGD0["lod2_base_area"] --> Ht_OGD
                Bg --> U_OGD0
            end

            subgraph calcHt_OGD1["Nutzereingabe"]
                U_OGD1["Wenn Nutzereingabe vorliegt:<br/>U_OGD = 1 / Rt_OGD"] --> Ht_OGD
                A_OGD1["A_OGD"] --> Ht_OGD

                Rt_OGD["Rt_OGD = Rt_OGD_Dämmung + Rt_OGD_Decke"] --> U_OGD1
                Rt_OGD_Dämmung["Rt_OGD_Dämmung = Rsi_OGD + Sr_OGD / L_OGD + Rse_OGD"] --> Rt_OGD
                Rsi_OGD --> Rt_OGD_Dämmung
                Sr_OGD[Sr_OGD<br/><br/>Direkteingabe oder fest 0,35 m] --> Rt_OGD_Dämmung
                L_OGD["Lambda = 0,032 W/mK"] --> Rt_OGD_Dämmung
                Rse_OGD --> Rt_OGD_Dämmung

                Rt_OGD_Decke["Rt_OGD_Decke = 1 / U_OGD_Decke"] --> Rt_OGD
                U_OGD_Decke["U_OGD_Decke über Bg_OGD und Dach_massiv aus Kat. 1"] --> Rt_OGD_Decke
            end

            subgraph calcHt_OGD2["Sanierung"]
                Sanierung_OGD_Empfehlung["Sanierungsempfehlung:<br/>OGD gedämmt -> keine Empfehlung<br/><br/>OGD nicht gedämmt -> Empfehlung Dämmung<br/><br/>Dämmung >40 Jahre -> Komplettsanierung"]
                Sanierung_OGD --> U_OGD2
                U_OGD2["U_OGD = 0,14 W/m²K"] --> Ht_OGD
                A_OGD2["Wenn Nutzereingabe vorliegt:<br/>A_OGD<br/><br/>Wenn keine Nutzereingabe vorliegt:<br/><br/>lod2_base_area"] --> Ht_OGD
            end
        end

        subgraph calcHt_Aussenwand["Berechnung Ht Aussenwand"]
            Bg_Aussenwand --> Sanierung_Aussenwand_Empfehlung
            Bg_Aussenwand --> U_Aussenwand1
            Bg_Aussenwand --> U_Aussenwand_Wand
            F_Aussenwand["F_Aussenwand = 1,00"] --> Ht_Aussenwand
            K_Aussenwand["Konstruktion Aussenwand"] --> U_Aussenwand1
            Aussenwand_Dämmung --> Sr_Aussenwand

            subgraph result_Ht_Aussenwand["Ht_Aussenwand"]
                Ht_Aussenwand["Transmissionsverluste Aussenwand:<br/>Ht_Aussenwand = F * U * A"]
            end

            subgraph calcHt_Aussenwand0["Keine Nutzereingabe"]
                U_Aussenwand0["U_Aussenwand über Bg aus Kat. 1<br/><br/><20 Jahre -> Massivwand mit WDVS 0,20 W/m²K<br/><br/>20-70 Jahre -> Sonstige Wandaufbauten über 20cm Wandstärke<br/><br/>>70 Jahre -> Wie vorstehend, jedoch über 30cm Wandstärke"] --> Ht_Aussenwand
                A_Aussenwand0["lod"] --> Ht_Aussenwand
                Bg --> U_Aussenwand0
            end

            subgraph calcHt_Aussenwand1["Nutzereingabe"]
               U_Aussenwand1["Wenn Nutzereingabe vorliegt:<br/>U_Aussenwand = 1 / Rt_Aussenwand"] --> Ht_Aussenwand
               A_Aussenwand1["A_Aussenwand"] --> Ht_Aussenwand

               Rt_Aussenwand["Rt_Aussenwand = Rt_Aussenwand_Dämmung + Rt_Aussenwand_Wand"] --> U_Aussenwand1
               Rt_Aussenwand_Dämmung["Rt_Aussenwand_Dämmung = Rsi_Aussenwand + Sr_Aussenwand / L_Aussenwand + Rse_Aussenwand"] --> Rt_Aussenwand
               Rsi_Aussenwand --> Rt_Aussenwand_Dämmung
               Sr_Aussenwand["Sr_Aussenwand<br/><br/>Direkteingabe oder fest 0,35 m"] --> Rt_Aussenwand_Dämmung
               L_Aussenwand["Lambda = 0,035 W/mK"] --> Rt_Aussenwand_Dämmung
               Rse_Aussenwand --> Rt_Aussenwand_Dämmung

               Rt_Aussenwand_Wand["Rt_Aussenwand_Wand = 1 / U_Aussenwand_Wand"] --> Rt_Aussenwand
               U_Aussenwand_Wand["U_Aussenwand_Wand über Bg_Aussenwand aus Kat. 1"] --> Rt_Aussenwand_Wand
            end

            subgraph calcHt_Aussenwand2["Sanierung"]
                Sanierung_Aussenwand_Empfehlung["Sanierungsempfehlung:<br/>Aussenwand gedämmt -> keine Empfehlung<br/><br/>Aussenwand nicht gedämmt -> Empfehlung Dämmung<br/><br/>Dämmung >50 Jahre → Empfehlung Dämmungstausch"]
                Sanierung_Aussenwand --> U_Aussenwand2
                U_Aussenwand2["U_Aussenwand = 0,20 W/m²K"] --> Ht_Aussenwand
                A_Aussenwand2["Wenn Nutzereingabe vorliegt:<br/>A_Aussenwand<br/><br/>Wenn keine Nutzereingabe vorliegt:<br/><br/>lod2_exterior_walls_area"] --> Ht_Aussenwand
            end
        end

        subgraph calcHt_Aussenwandfenster["Berechnung Ht Aussenwandfenster"]
            Bg_Aussenwandfenster --> U_Aussenwandfenster1
            Bg_Aussenwandfenster --> Sanierung_Aussenwandfenster_Empfehlung
            Aussenwandfenster_Glas --> U_Aussenwandfenster0
            Aussenwandfenster_Glas --> U_Aussenwandfenster1
            Aussenwandfenster_Rahmen --> U_Aussenwandfenster0
            Aussenwandfenster_Rahmen --> U_Aussenwandfenster1
            F_Aussenwandfenster["F_Aussenwandfenster  = 1,00"] --> Ht_Aussenwandfenster

            subgraph result_Ht_Aussenwandfenster["Ht_Aussenwandfenster"]
                Ht_Aussenwandfenster["Transmissionsverluste Aussenwandfenster:<br/>Ht_Aussenwandfenster = F * U * A"]
            end

            subgraph calcHt_Aussenwandfenster0["Keine Nutzereingabe"]
                U_Aussenwandfenster0["U_Aussenwandfenster über Bg, Aussenwandfenster_Glas, Aussenwandfenster_Rahmen aus Kat. 1<br/><br/>>40 Jahre -> Holzfenster, zwei Scheiben<br/><br/><40 Jahre -> Kunsstofffenster, Isolierverglasung"] --> Ht_Aussenwandfenster
                A_Aussenwandfenster0["lod2_exterior_walls_windows_area"] --> Ht_Aussenwandfenster
                Bg --> U_Aussenwandfenster0
            end

            subgraph calcHt_Aussenwandfenster1["Nutzereingabe"]
                U_Aussenwandfenster1["Wenn U_Aussenwandfenster als Nutzereingabe vorliegt -> direkt nutzen<br/><br/>Wenn U_Aussenwandfenster nicht direkt vorliegt -> Über Bg_Aussenwandfenster, Aussenwandfenster_Rahmen und Aussenwandfenster_Glas aus Kat. 1"] --> Ht_Aussenwandfenster
                A_Aussenwandfenster1["A_Aussenwandfenster"] --> Ht_Aussenwandfenster
            end

            subgraph calcHt_Aussenwandfenster2["Sanierung"]
                Sanierung_Aussenwandfenster_Empfehlung["Sanierungsempfehlung:<br/><30 Jahre -> keine Empfehlung<br/><br/>>30 Jahre -> Aussenwandfenstertausch"]
                Sanierung_Aussenwandfenster --> U_Aussenwandfenster2
                U_Aussenwandfenster2["U_Aussenwandfenster = 0,95 W/m²K"] --> Ht_Aussenwandfenster
                A_Aussenwandfenster2["Wenn Nutzereingabe vorliegt:<br/>A_Aussenwandfenster<br/><br/>Wenn keine Nutzereingabe vorliegt:<br/><br/>lod2_exterior_walls_windows_area"] --> Ht_Aussenwandfenster
            end
        end

        subgraph calcHt_UGD["Berechnung Ht UGD"]
            Bg_UGD --> U_UGD_Decke
            Bg_UGD --> Sanierung_UGD_Empfehlung
            Keller_beheizt["Wenn Nutzereingabe vorliegt:<br/>Ja -> Boden gegen Erdreich, Stahlbeton massiv.<br/><br/>Nein -> <br/><br/>Wenn keine Nutzereingabe vorliegt: Nein"] --> U_UGD0
            Keller_beheizt --> U_UGD_Decke
            Kellerdecke_massiv["Wenn Nutzereingabe vorliegt:<br/>Keller_massiv<br/><br/>Wenn keine Nutzereingabe vorliegt:<br/><60 Jahre -> Stahlbeton massiv<br/><br/>>60 Jahre -> Holzbalken"] --> U_UGD0
            Kellerdecke_massiv --> U_UGD_Decke
            F_UGD["F_UGD = 1,00"] --> Ht_UGD

            subgraph result_Ht_UGD["Ht_UGD"]
                Ht_UGD["Transmissionsverluste UGD:<br/>Ht_UGD = F * U * A"]
            end

            subgraph calcHt_UGD0["Keine Nutzereingabe"]
                U_UGD0["U_UGD über Bg, Keller_beheizt und Kellerdecke_massiv aus Kat. 1<br/><br/>>60 Jahre -> Kellerdecke Stahlbeton massiv<br/><br/><60 Jahre -> Kellerdecke als Holzbalkendecke<br/><br/>Boden gegen Erdreich, Stahlbeton massiv -> beheizter Keller"] --> Ht_UGD
                A_UGD0["lod2_base_area"] --> Ht_UGD
                Bg --> U_UGD0
            end

            subgraph calcHt_UGD1["Nutzereingabe"]
                U_UGD1["Wenn Nutzereingabe vorliegt:<br/>U_UGD = 1 / Rt_UGD"] --> Ht_UGD
                A_UGD1["A_UGD"] --> Ht_UGD

                Rt_UGD["Rt_UGD = Rt_UGD_Dämmung + Rt_UGD_Decke"] --> U_UGD1
                Rt_UGD_Dämmung["Rt_UGD_Dämmung = Rsi_UGD + Sr_UGD / L_UGD + Rse_UGD"] --> Rt_UGD
                Rsi_UGD --> Rt_UGD_Dämmung
                Sr_UGD["Direkteingabe oder fest 0,30 m"] --> Rt_UGD_Dämmung
                L_UGD["Lambda = 0,030 W/mK"] --> Rt_UGD_Dämmung
                Rse_UGD --> Rt_UGD_Dämmung

                Rt_UGD_Decke["Rt_UGD_Decke = 1 / U_UGD_Decke"] --> Rt_UGD
                U_UGD_Decke["U_UGD_Decke über Bg_UGD, Keller_beheizt und Kellerdecke_massiv aus Kat. 1"] --> Rt_UGD_Decke
            end

            subgraph calcHt_UGD2["Sanierung"]
                Sanierung_UGD_Empfehlung["Sanierungsempfehlung:<br/>UGD gedämmt -> keine Empfehlung<br/><br/>UGD nicht gedämmt -> Empfehlung Dämmung<br/><br/>Dämmung >40 Jahre -> Komplettsanierung"]
                Sanierung_UGD --> U_UGD2
                U_UGD2["U_UGD = 0,25 W/m²K"] --> Ht_UGD
                A_UGD2["Wenn Nutzereingabe vorliegt:<br/>A_UGD<br/><br/>Wenn keine Nutzereingabe vorliegt:<br/><br/>lod2_base_area"] --> Ht_UGD
            end
        end

        %%SHt_placeholder["SHt = calcHt_Dach + calcHt_Dachfenster + calcHt_OGD + calcHt_Aussenwand + calcHt_Aussenwandfenster + calcHt_UGD"]
        %%calcHt_Dach --> SHt_placeholder
        %%calcHt_Dachfenster --> SHt_placeholder
        %%calcHt_OGD --> SHt_placeholder
        %%calcHt_Aussenwand --> SHt_placeholder
        %%calcHt_Aussenwandfenster --> SHt_placeholder
        %%calcHt_UGD --> SHt_placeholder
    end

    subgraph HeatingRestoration["Sanierung Heizung"]
        subgraph HeatingRestorationSurface["Empfehlung Flächenheizung"]
            Fl["Flächenheizung erwünscht?"] -->  Fl_Öl_Standardkessel
            Fl --> Fl_Erdgas_Brennwertkessel
            Fl --> Fl_Stromdirektheizung
            Fl --> Fl_Heizkörper
            Fl_Öl_Standardkessel["Energieträger Öl + Erzeugerart Standardkessel"] --> Flächenheizung["Empfehlung Flächenheizung mit Wärmepumpe"]
            Fl_Erdgas_Brennwertkessel["Energieträger Erdgas + Erzeugerart Brennwertkessel"] --> Flächenheizung
            Fl_Stromdirektheizung["Energieträger Strom + Erzeugerart Stromdirektheizung"] --> Flächenheizung
            Fl_Heizkörper["Heizflächenart Heizkörper"] --> Flächenheizung
        end

        subgraph HeatingRestorationBiomass["Empfehlung Biomasse und Fernwärme"]
            Lf["Brennstofflagerfläche vorhanden?"] --> Lf_Öl_Niedertemperaturkessel
            Lf --> Lf_Erdgas_Niedertemperaturkessel
            Lf_Öl_Niedertemperaturkessel["Energieträger Öl + Erzeugerart Niedertemperaturkessel"] --> Biomasse["Wenn Brennstofflagerfläche vorhanden ist: Empfehlung Biomasse<br/><br/>Wenn Brennstofflagerfläche nicht vorhanden ist: Empfehlung Fernwärme"]
            Lf_Erdgas_Niedertemperaturkessel["Energieträger Erdgas + Erzeugerart Niedertemperaturkessel"] --> Biomasse
        end

        subgraph HeatingRestorationRenewables["Empfehlung erneuerbare Energien"]
            Pv["Photovoltaik laut Solarkataster möglich"] --> Pvn
            Pvn["Photovoltaik noch nicht vorhanden"] --> Photovoltaik["Empfehlung Photovoltaik"]
            %%Gt["Geothermie vorhanden"]
            %%Gv["Gasanschluss vorhanden"]
        end
    end

end

style const_assumed_floor_height fill:#4CAF50
style const_assumed_roof_thickness fill:#4CAF50
style const_kVl fill:#4CAF50
style const_kAn fill:#4CAF50
style const_kAngf fill:#4CAF50
style lod2_base_area fill:#4CAF50
style lod2_total_height fill:#4CAF50
style user_building_type fill:#4CAF50
style user_building_area fill:#4CAF50
style user_building_floors fill:#4CAF50
style user_basement_is_heated fill:#4CAF50
style he fill:#4CAF50
style Ve fill:#4CAF50
style Vl fill:#4CAF50
style kVl fill:#4CAF50
style An fill:#4CAF50
style Angf fill:#4CAF50
style f fill:#4CAF50
style hg fill:#4CAF50
style hd fill:#4CAF50
style Ah fill:#4CAF50
style kAn fill:#4CAF50
style kAngf fill:#4CAF50
style est_floors fill:#FFC107

style const_kHv fill:#4CAF50
style kHv fill:#4CAF50
style const_nHv fill:#4CAF50
style nHv fill:#4CAF50
style Hv fill:#4CAF50
style user_building_year fill:#4CAF50
style Bg fill:#4CAF50
style user_heating_year fill:#4CAF50
style Bah fill:#4CAF50
style user_heating_type fill:#4CAF50
style Hfa fill:#4CAF50
style Th fill:#4CAF50
style const_eH fill:#4CAF50
style eH fill:#4CAF50
style const_ehce0 fill:#4CAF50
style const_ehce1 fill:#4CAF50
style const_ehce2 fill:#4CAF50
style ehce0 fill:#4CAF50
style ehce1 fill:#4CAF50
style ehce2 fill:#4CAF50
style eges fill:#4CAF50
style const_HDD fill:#4CAF50
style HDD fill:#4CAF50
style Qhn fill:#4CAF50
style Qh fill:#4CAF50
style const_kQwb fill:#4CAF50
style kQwb fill:#4CAF50
style Qwb fill:#4CAF50
style Qf fill:#4CAF50
style qf fill:#4CAF50
style user_heating_energy_carrier fill:#4CAF50
style const_fp fill:#4CAF50
style fp fill:#4CAF50
style const_xco2 fill:#4CAF50
style xco2 fill:#4CAF50
style mco2 fill:#4CAF50
style Qp fill:#4CAF50
style qp fill:#4CAF50
style H fill:#FFC107

style const_bheiz fill:#4CAF50
style const_barb fill:#4CAF50
style const_bgrund fill:#4CAF50
style Bverb fill:#4CAF50
style Bcost fill:#4CAF50
style bheiz fill:#4CAF50
style barb fill:#4CAF50
style bgrund fill:#4CAF50

style user_roof_area fill:#4CAF50
style user_roof_year fill:#4CAF50
style Dach_massiv fill:#4CAF50
style Dach_Dämmung_Art fill:#4CAF50
style A_Dach1 fill:#4CAF50
style Rsi_Dach fill:#4CAF50
style Rse_Dach fill:#4CAF50
style Sr_Dach fill:#4CAF50
style L_Dach fill:#4CAF50
style Fmin_Dach fill:#4CAF50
style Rt_Dach fill:#4CAF50
style U_Dach1 fill:#FFC107
style U_Dach0 fill:#4CAF50
style Ht_Dach fill:#4CAF50
style F_Dach fill:#4CAF50

style user_roof_window_area fill:#4CAF50
style user_roof_window_year fill:#4CAF50
style user_roof_window_frame fill:#4CAF50
style user_roof_window_glass fill:#4CAF50
style Bg_Dachfenster fill:#4CAF50
style A_Dachfenster1 fill:#4CAF50
style U_Dachfenster0 fill:#4CAF50
style U_Dachfenster1 fill:#4CAF50
style F_Dachfenster fill:#4CAF50
style Ht_Dachfenster fill:#4CAF50

style user_exterior_wall_window_area fill:#4CAF50
style user_exterior_wall_window_year fill:#4CAF50
style user_exterior_wall_window_frame fill:#4CAF50
style user_exterior_wall_window_glass fill:#4CAF50
style Bg_Aussenwandfenster fill:#4CAF50
style A_Aussenwandfenster1 fill:#4CAF50
style U_Aussenwandfenster0 fill:#4CAF50
style U_Aussenwandfenster1 fill:#4CAF50
style F_Aussenwandfenster fill:#4CAF50
style Ht_Aussenwandfenster fill:#4CAF50
