import { Ionicons } from "@expo/vector-icons";
import { useIsFocused } from "@react-navigation/native";
import { BarcodeScanningResult, CameraView, useCameraPermissions } from "expo-camera";
import * as WebBrowser from "expo-web-browser";
import React, { useEffect, useRef, useState } from "react";
import { Animated, Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { Dialog, Portal, Text, useTheme } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

import { useLanguageStore } from "@/src/zustand/store";
import homeTexts from "@/static/homeTexts.json";


export default function CameraScreen() {
  const theme = useTheme();
  const [facing, setFacing] = useState<"front" | "back">("back");
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);
  const [scanActive, setScanActive] = useState(false);
  const cameraRef = useRef<CameraView | null>(null);
  const isFocused = useIsFocused();

  //For custom alert
  const [dialogVisible, setDialogVisible] = useState(false);
  const [scannedUrl, setScannedUrl] = useState<string | null>(null);

  // Language support
  const { language } = useLanguageStore();
  const t = homeTexts[language].camera;


  const animationValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (!permission) return;
  }, [permission]);


  useEffect(() => {
    if (!isFocused) {
      setScanned(false);
      setScanActive(false);
    }
  }, [isFocused]);

  useEffect(() => {
    if (scanActive) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(animationValue, {
            toValue: 200,
            duration: 1500,
            useNativeDriver: true,
          }),
          Animated.timing(animationValue, {
            toValue: 0,
            duration: 1500,
            useNativeDriver: true,
          }),
        ])
      ).start();
    } else {
      animationValue.stopAnimation();
    }
  }, [scanActive, animationValue]);

  const handleBarCodeScanned = ({ data }: BarcodeScanningResult) => {
    setScanned(true);
    setScanActive(false);

    if (data.startsWith("http://") || data.startsWith("https://")) {
      setScannedUrl(data);
      setDialogVisible(true);
    }
  };


  if (!permission) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
        <Text style={[styles.text, { color: theme.colors.onBackground }]}>
          {t.requestingPermission}
        </Text>
      </SafeAreaView>
    );
  }

  if (!permission.granted) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
        <View style={styles.permission}>
          <Image
            source={require("../../assets/images/HH_For_Camera.png")}
            style={styles.permissionImage}
            resizeMode="contain"
          />
          <Text style={[styles.text, { color: theme.colors.onBackground }]}>
            {t.permissionMessage}
          </Text>
          <TouchableOpacity
            style={[styles.permissionButton, { backgroundColor: theme.colors.primary }]}
            onPress={async () => {
              const newPermission = await requestPermission();
              if (newPermission.granted) {
                console.log("Camera permission granted!");
                // You can now show the CameraView
              } else if (!newPermission.canAskAgain) {
                alert(t.permissionBlocked);
              } else {
                console.log("Permission denied, you can ask again later");
              }
            }}

          >
            <Text style={[styles.permissionText, { color: theme.colors.onPrimary }]}>
              {t.grantPermission}
            </Text>
          </TouchableOpacity>

        </View>
      </SafeAreaView>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      {isFocused && (
        <CameraView
          ref={cameraRef}
          style={styles.camera}
          zoom={0.1}
          facing={facing}
          onBarcodeScanned={scanActive ? handleBarCodeScanned : undefined}
        />
      )}

      {/* Overlay when scanning is active */}
      {scanActive && !scanned && (
        <View style={styles.overlayContainer}>
          <View style={styles.scannerSquare}>
            <Animated.View
              style={[
                styles.scannerLine,
                {
                  transform: [{ translateY: animationValue }],
                  backgroundColor: theme.colors.primary,
                },
              ]}
            />
          </View>
        </View>
      )}

      {dialogVisible && (
        <Portal>
          <Dialog visible={dialogVisible} onDismiss={() => setDialogVisible(false)}>
            <Dialog.Title>
              {t.dialogTitle} <Ionicons name="link-outline" size={20} color={theme.colors.primary} />
            </Dialog.Title>
            <Dialog.Content>
              <Text>{scannedUrl}</Text>
            </Dialog.Content>
            <Dialog.Actions>
              <TouchableOpacity onPress={() => setDialogVisible(false)}>
                <Text style={{ color: theme.colors.error, marginRight: 20 }}>{t.dialogCancel}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={async () => {
                  if (scannedUrl) await WebBrowser.openBrowserAsync(scannedUrl);
                  setDialogVisible(false);
                }}
              >
                <Text style={{ color: theme.colors.primary }}>{t.dialogOpen}</Text>
              </TouchableOpacity>
            </Dialog.Actions>
          </Dialog>
        </Portal>
      )}



      <View style={[styles.bottomContainer, { backgroundColor: theme.colors.surfaceVariant }]}>
        {/* Flip camera */}
        <TouchableOpacity
          style={styles.button}
          onPress={() => setFacing(facing === "back" ? "front" : "back")}
        >
          <Ionicons name="camera-reverse-outline" size={28} color={theme.colors.onSurface} />
          <Text style={[styles.buttonText, { color: theme.colors.onSurface }]}>{t.flipButton}</Text>
        </TouchableOpacity>

        {/* Activate scanning */}
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            setScanned(false);
            setScanActive(true);
          }}
        >
          <Ionicons name="qr-code-outline" size={28} color={theme.colors.onSurface} />
          <Text style={[styles.buttonText, { color: theme.colors.onSurface }]}>{t.scanButton}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  camera: {
    flex: 1,
    justifyContent: "flex-end"
  },
  bottomContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingVertical: 12,
  },
  button: {
    alignItems: "center"
  },
  buttonText: {
    fontSize: 14,
    marginTop: 4
  },
  text: {
    fontSize: 18,
    textAlign: "center",
    marginBottom: 20
  },
  permission: {
    margin: 100
  },
  permissionButton: {
    alignSelf: "center",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  permissionText: {
    fontWeight: "600"
  },
  scanningOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 80, // leave space for bottom buttons
    justifyContent: "center",
    alignItems: "center",
  },
  scanningText: {
    fontSize: 22,
    fontWeight: "700",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 12,
  },
  overlayContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 80,
    justifyContent: "center",
    alignItems: "center",
  },
  scannerSquare: {
    width: 250,
    height: 250,
    borderWidth: 3,
    borderColor: "#00FFAA",
    borderRadius: 12,
    overflow: "hidden",
    backgroundColor: "rgba(0,0,0,0.2)",
  },
  scannerLine: {
    position: "absolute",
    width: "100%",
    height: 3,
    top: 0,
  },
  permissionImage: {
    width: 300,
    height: 300,
    alignSelf: "center",
  },
});