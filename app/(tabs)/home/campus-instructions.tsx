import { MaterialCommunityIcons } from "@expo/vector-icons"; // arrow icon
import { useIsFocused } from "@react-navigation/native";
import * as WebBrowser from "expo-web-browser";
import { MotiImage, MotiView } from "moti"; // for smooth animations
import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { Button, Text, useTheme } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";


//List of all links
const links = [
  {
    title: "Haaga Helian turvallisuusopas (kirjaudu)",
    url: "https://haagahelia.sharepoint.com/sites/Korkeakoulumme/Jaetut%20asiakirjat/Forms/AllItems.aspx?id=%2Fsites%2FKorkeakoulumme%2FJaetut%20asiakirjat%2FOpiskelijoille%20linkitetyt%20tiedostot%2FTurvallisuus%2FHaaga%2DHelian%2Dturvallisuusopas%2Epdf&parent=%2Fsites%2FKorkeakoulumme%2FJaetut%20asiakirjat%2FOpiskelijoille%20linkitetyt%20tiedostot%2FTurvallisuus",
  },
  {
    title: "Turvallisuuskävelyohje opiskelijoille (kirjaudu)",
    url: "https://haagahelia.sharepoint.com/sites/Korkeakoulumme/Jaetut%20asiakirjat/Forms/AllItems.aspx?id=%2Fsites%2FKorkeakoulumme%2FJaetut%20asiakirjat%2FOpiskelijoille%20linkitetyt%20tiedostot%2FTurvallisuus%2FTurvallisuuskavely%2Dopiskelijat%2Dfi%2Epdf&parent=%2Fsites%2FKorkeakoulumme%2FJaetut%20asiakirjat%2FOpiskelijoille%20linkitetyt%20tiedostot%2FTurvallisuus",
  },
  {
    title: "Turvallisuuskävelyn pitäjän ohje tuutoreille (kirjaudu)",
    url: "https://haagahelia.sharepoint.com/sites/Korkeakoulumme/Jaetut%20asiakirjat/Forms/AllItems.aspx?id=%2Fsites%2FKorkeakoulumme%2FJaetut%20asiakirjat%2FOpiskelijoille%20linkitetyt%20tiedostot%2FTurvallisuus%2FTurvallisuuskavely%2Dohje%2Dpitajalle%2Dfi%2Epdf&parent=%2Fsites%2FKorkeakoulumme%2FJaetut%20asiakirjat%2FOpiskelijoille%20linkitetyt%20tiedostot%2FTurvallisuus",
  },
  {
    title: "Poistuminen rakennuksesta",
    url: "https://www.youtube.com/watch?v=qDaL18sXeEA",
  },
  //Campus buttons
  {
    title: "Pasila",
    url: "https://pelsu-files-production-eu-west-1.s3.eu-west-1.amazonaws.com/uploads/74247d41-ddff-4103-82a4-8b6e359c2c8b/Opetustalo_aluekuva_2-2020.pdf",
  }, {
    title: "Malmi",
    url: "https://haagahelia.sharepoint.com/sites/Korkeakoulumme/SiteAssets/Forms/AllItems.aspx?id=%2Fsites%2FKorkeakoulumme%2FSiteAssets%2FSitePages%2FTurvallisuus%2Dja%2Dkriisitoimintaohje%2FPerho%2DLiiketalousopisto%2DMalmin%2Dkampuksen%2Dpelastussuunnitelma%2D2022%2Epdf&parent=%2Fsites%2FKorkeakoulumme%2FSiteAssets%2FSitePages%2FTurvallisuus%2Dja%2Dkriisitoimintaohje",
  }, {
    title: "Porvoo",
    url: "https://haagahelia.sharepoint.com/sites/Korkeakoulumme/SiteAssets/Forms/AllItems.aspx?id=%2Fsites%2FKorkeakoulumme%2FSiteAssets%2FSitePages%2FTurvallisuus%2Dja%2Dkriisitoimintaohje%2F784766814Pelastussuunnitelma%5F2024%2Epdf&parent=%2Fsites%2FKorkeakoulumme%2FSiteAssets%2FSitePages%2FTurvallisuus%2Dja%2Dkriisitoimintaohje",
  }, {
    title: "Haaga",
    url: "https://m.fimx.fi/app_pub/reldocopen.php?DocKey=ac6c66bb01768d5e795375b0adc71e81&view=1",
  }, {
    title: "Vierumäki",
    url: "https://haagahelia.sharepoint.com/sites/Korkeakoulumme/Jaetut%20asiakirjat/Forms/AllItems.aspx?id=%2Fsites%2FKorkeakoulumme%2FJaetut%20asiakirjat%2FOpiskelijoille%20linkitetyt%20tiedostot%2FTurvallisuus%2FVierumaki%2DTurvallisuus%2Dkriisitoimintaopas%2Epdf&parent=%2Fsites%2FKorkeakoulumme%2FJaetut%20asiakirjat%2FOpiskelijoille%20linkitetyt%20tiedostot%2FTurvallisuus",
  },
];

// Kampuskohtaiset ohjeet screen
export default function CampusInstructionsScreen() {
  const theme = useTheme();
  const isFocused = useIsFocused();
  const [key, setKey] = useState(0);
  const [showCampuses, setShowCampuses] = useState(false);
  const [showGuidelines, setShowGuidelines] = useState(false);


  useEffect(() => {
    if (isFocused) {
      // Each time screen is focused, update key to re-render components
      setKey((prev) => prev + 1);
    }
  }, [isFocused]);

  const openWebsite = async (url: string) => {
    try {
      await WebBrowser.openBrowserAsync(url); // opens in the system browser
    } catch (error) {
      console.error("Failed to open website:", error);
      alert("Cannot open the link.");
    }
  };

  // Split links
  const generalLinks = links.slice(0, 4);
  const campusLinks = links.slice(4);

  return (
    <SafeAreaView
      style={[styles.safeArea, { backgroundColor: theme.colors.background }]}
      edges={[]}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        contentInsetAdjustmentBehavior="never"
      >
        {/* 1. Image */}
        <MotiImage
          key={`image-${key}`}
          source={require("../../../assets/images/HH_EmergencyExit.png")}
          style={styles.Image}
          from={{ opacity: 0, translateY: -10 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: "timing", duration: 500 }}
          resizeMode="contain"
        />

        {/* 2. Description */}
        <MotiView
          key={`desc-${key}`}
          from={{ opacity: 0, translateY: -20 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: "timing", duration: 500, delay: 150 }}
        >
          <Text style={[styles.title, { color: theme.colors.onBackground }]}>
            Kampusten pelastussuunnitelmat ja toiminta vaaratilanteissa
          </Text>
          <Text style={[styles.description, { color: theme.colors.onBackground }]}>
            Täältä löydät Haaga-Helian turvallisuusoppaan sekä kampusten turvallisuuskävelyvideot, pelastussuunnitelmat sekä toimintaohjeet vaaratilanteissa.
          </Text>
        </MotiView>

        {/* 3a. Guidelines Dropdown */}
        <MotiView
          from={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", delay: 600 }}
        >
          <View style={[styles.dropdown, { backgroundColor: theme.colors.surface, }]}>
            <TouchableOpacity
              style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", width: "100%" }}
              onPress={() => setShowGuidelines(!showGuidelines)}
            >
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <MaterialCommunityIcons
                  name="file-document-outline"
                  size={24}
                  color={theme.colors.onSurface}
                  style={{ marginRight: 8 }}
                />
                <Text style={{ fontSize: 18, fontWeight: "700", color: theme.colors.onSurface }}>
                  Turvallisuusohjeet
                </Text>
              </View>
              <MotiView
                animate={{ rotate: showGuidelines ? "180deg" : "0deg" }}
                transition={{ type: "timing", duration: 300 }}
              >
                <MaterialCommunityIcons
                  name="chevron-down"
                  size={28}
                  color={theme.colors.onSurface}
                />
              </MotiView>
            </TouchableOpacity>
          </View>
        </MotiView>

        {/* 3b. Guidelines Links Buttons */}
        {showGuidelines && (
          <MotiView
            from={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            transition={{ type: "timing", duration: 300 }}
            style={{ width: "100%", alignItems: "center", marginTop: 12 }}
          >
            {generalLinks.map((item, index) => (
              <Button
                key={`guideline-${index}`}
                mode={index === 3 ? "outlined" : "contained"}
                icon={index < 3 ? "file-document" : "youtube"}
                style={[styles.guidelinebuttons, index === 3 && styles.youtubeButton]}
                labelStyle={index === 3 ? styles.youtubeLabel : undefined}
                onPress={() => openWebsite(item.url)}
              >
                {item.title}
              </Button>
            ))}
          </MotiView>
        )}

        {/* 4a. Campuses Secure Plans Dropdown */}
        <MotiView
          from={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", delay: 900 }}
        >
          <View style={[styles.dropdown, { backgroundColor: theme.colors.surface, }]}>
            <TouchableOpacity
              style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", width: "100%" }}
              onPress={() => setShowCampuses(!showCampuses)}
            >
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <MaterialCommunityIcons
                  name="exit-run"
                  size={24}
                  color={theme.colors.onSurface}
                  style={{ marginRight: 8 }}
                />
                <Text style={{ fontSize: 18, fontWeight: "700", color: theme.colors.onSurface }}>
                  Pelastussuunnitelmat
                </Text>
              </View>
              <MotiView
                animate={{ rotate: showCampuses ? "180deg" : "0deg" }}
                transition={{ type: "timing", duration: 300 }}
              >
                <MaterialCommunityIcons
                  name="chevron-down"
                  size={28}
                  color={theme.colors.onSurface}
                />
              </MotiView>
            </TouchableOpacity>
          </View>
        </MotiView>

        {/* 4b. Campus Secure Plans Buttons */}
        {showCampuses && (
          <MotiView
            from={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            transition={{ type: "timing", duration: 300 }}
            style={{ width: "100%", alignItems: "center", marginTop: 12 }}
          >
            {campusLinks.map((item, index) => (
              <Button
                key={`campus-${index}`}
                mode="outlined"
                style={[styles.campusbuttons, { borderColor: theme.colors.secondary }]}
                labelStyle={{ fontWeight: "700" }}
                onPress={() => openWebsite(item.url)}
              >
                {item.title}
              </Button>
            ))}
          </MotiView>
        )}

      </ScrollView >
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  scrollContent: {
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  Image: {
    width: "100%",
    height: 280,
    borderRadius: 16,
    margin: 16,
    padding: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 8,
    textAlign: "center",
  },
  description: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 16,
  },
  guidelinebuttons: {
    borderRadius: 24,
    paddingHorizontal: 24,
    marginTop: 12,
  },
  youtubeButton: {
    borderColor: "red",
    borderWidth: 2,
    marginTop: 16,
  },
  youtubeLabel: {
    color: "red",
    fontWeight: "700",
  },
  campusbuttons: {
    borderRadius: 24,
    marginTop: 12,
    minWidth: 320,
  },
  dropdown: {
    width: "100%",
    borderRadius: 16,
    padding: 16,
    marginTop: 16,
    alignItems: "center",
  }
});