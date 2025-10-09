import { Ionicons } from "@expo/vector-icons";
import { useIsFocused } from "@react-navigation/native";
import { BarcodeScanningResult, CameraView, useCameraPermissions } from "expo-camera";
import * as WebBrowser from "expo-web-browser";
import React, { useEffect, useRef, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useTheme } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

export default function CameraScreen() {
  const theme = useTheme();
  const [facing, setFacing] = useState<"front" | "back">("back");
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);
  const [scanActive, setScanActive] = useState(false);
  const cameraRef = useRef<CameraView | null>(null);
  const isFocused = useIsFocused();

  useEffect(() => {
    if (!permission) requestPermission();
  }, [permission, requestPermission]);

  useEffect(() => {
    if (!isFocused) {
      setScanned(false);
      setScanActive(false);
    }
  }, [isFocused]);

  const handleBarCodeScanned = async ({ data }: BarcodeScanningResult) => {
    setScanned(true);
    setScanActive(false);

    if (data.startsWith("http://") || data.startsWith("https://")) {
      try {
        await WebBrowser.openBrowserAsync(data);
      } catch (error) {
        console.error(error);
      }
    }
  };

  if (!permission) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
        <Text style={[styles.text, { color: theme.colors.onBackground }]}>
          Requesting camera permission...
        </Text>
      </SafeAreaView>
    );
  }

  if (!permission.granted) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
        <View style={styles.permission}>
          <Text style={[styles.text, { color: theme.colors.onBackground }]}>
            We need access to your camera
          </Text>
          <TouchableOpacity
            style={[
              styles.permissionButton,
              { backgroundColor: theme.colors.primary },
            ]}
            onPress={requestPermission}
          >
            <Text style={[styles.permissionText, { color: theme.colors.onPrimary }]}>
              Grant Permission
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
          facing={facing}
          onBarcodeScanned={scanActive ? handleBarCodeScanned : undefined}
        />
      )}

      {/* Overlay when scanning is active */}
      {scanActive && !scanned && (
        <View style={[styles.scanningOverlay, { backgroundColor: theme.colors.backdrop }]}>
          <Text
            style={[
              styles.scanningText,
              { backgroundColor: theme.colors.surfaceVariant, color: theme.colors.onSurfaceVariant },
            ]}
          >
            Scanning...
          </Text>
        </View>
      )}

      <View style={[styles.bottomContainer, { backgroundColor: theme.colors.surfaceVariant }]}>
        {/* Flip camera */}
        <TouchableOpacity
          style={styles.button}
          onPress={() => setFacing(facing === "back" ? "front" : "back")}
        >
          <Ionicons name="camera-reverse-outline" size={28} color={theme.colors.onSurface} />
          <Text style={[styles.buttonText, { color: theme.colors.onSurface }]}>Käännä kamera</Text>
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
          <Text style={[styles.buttonText, { color: theme.colors.onSurface }]}>Lue QR-koodi</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  camera: { flex: 1, justifyContent: "flex-end" },
  bottomContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingVertical: 12,
  },
  button: { alignItems: "center" },
  buttonText: { fontSize: 14, marginTop: 4 },
  text: { fontSize: 18, textAlign: "center", marginBottom: 20 },
  permission: { margin: 100 },
  permissionButton: {
    alignSelf: "center",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  permissionText: { fontWeight: "600" },
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
});