import * as Device from "expo-device";
import { Platform, StyleSheet, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { AnimatedIcon } from "@/components/animated-icon";
import { HintRow } from "@/components/hint-row";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { WebBadge } from "@/components/web-badge";
import { BottomTabInset, MaxContentWidth, Spacing } from "@/constants/theme";
import { Nutifar } from "@nutifar/expo";

import { useEffect, useState } from "react";

function getDevMenuHint() {
  if (Platform.OS === "web") {
    return <ThemedText type="small">use browser devtools</ThemedText>;
  }
  if (Device.isDevice) {
    return (
      <ThemedText type="small">
        shake device or press <ThemedText type="code">m</ThemedText> in terminal
      </ThemedText>
    );
  }
  const shortcut = Platform.OS === "android" ? "cmd+m (or ctrl+m)" : "cmd+d";
  return (
    <ThemedText type="small">
      press <ThemedText type="code">{shortcut}</ThemedText>
    </ThemedText>
  );
}

export default function HomeScreen() {
  const [status, setStatus] = useState<string>("idle");
  const sdk = Nutifar({
    apiKey: "pk_a4c88f3d35252508c3f8bb84647dbcf6d000c7dec28ec85d",
    // apiKey: "pk_f3ee504d29790699ab8dc396cbab5d82579f2136fa859a47",
  });
  // optional: listen for foreground messages
  useEffect(() => {
    console.log("📩 test push:", status);
    console.log("sdk", sdk.device);
    sdk.push.listen((payload: any) => {
      console.log("📩 Foreground push:", payload);
      setStatus("received foreground message");
    });
  }, []);

  const registerDevice = async () => {
    try {
      console.log("📩 requesting permission");
      setStatus("requesting permission...");

      const { token, response } = await sdk.push.register(); // 👈 use push manager

      console.log("📩 registered:", token, response);
      setStatus("device registered ✅");
    } catch (err: any) {
      console.error(err);
      setStatus("error registering device ❌");
    }
  };
  // const registerDevice = async () => {
  //   try {
  //     console.log("📩 requesting permission");
  //     setStatus("requesting permission...");

  //     await sdk.device.register();

  //     setStatus("device registered ✅");
  //   } catch (err: any) {
  //     console.error(err);
  //     setStatus("error registering device ❌");
  //   }
  // };

  // const sendEmail = async () => {
  //   try {
  //     console.log("📩 sending email");
  //     setStatus("sending email...");

  //     await sdk.notifications.sendEmail({
  //       to: "mystik5551@gmail.com",
  //       subject: "Test Email",
  //       body: "This is a test email.",
  //     });

  //     setStatus("email sent ✅");
  //   } catch (err: any) {
  //     console.error(err);
  //     setStatus("error sending email ❌");
  //   }
  // };

  const refreshToken = async () => {
    try {
      setStatus("refreshing token...");

      await sdk.device.refreshToken("OLD_TOKEN_HERE");

      setStatus("token refreshed ✅");
    } catch (err) {
      console.error(err);
      setStatus("error refreshing ❌");
    }
  };

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <ThemedView style={styles.heroSection}>
          <AnimatedIcon />
          <ThemedText type="title" style={styles.title}>
            Welcome to&nbsp;Nutifar
          </ThemedText>
        </ThemedView>

        <ThemedText type="code" style={styles.code}>
          get started
        </ThemedText>

        <ThemedView type="backgroundElement" style={styles.stepContainer}>
          <TouchableOpacity onPress={registerDevice} style={styles.button}>
            <Text style={styles.btnText}>Register</Text>
          </TouchableOpacity>
          {/* <TouchableOpacity onPress={sendEmail} style={styles.button}>
            <Text style={styles.btnText}>Send Email</Text>
          </TouchableOpacity> */}
          <HintRow title="Dev tools" hint={getDevMenuHint()} />
          <HintRow
            title="Fresh start"
            hint={<ThemedText type="code">npm run reset-project</ThemedText>}
          />
        </ThemedView>

        {Platform.OS === "web" && <WebBadge />}
      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    flexDirection: "row",
  },
  safeArea: {
    flex: 1,
    paddingHorizontal: Spacing.four,
    alignItems: "center",
    gap: Spacing.three,
    paddingBottom: BottomTabInset + Spacing.three,
    maxWidth: MaxContentWidth,
  },
  heroSection: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    paddingHorizontal: Spacing.four,
    gap: Spacing.four,
  },
  title: {
    textAlign: "center",
  },
  code: {
    textTransform: "uppercase",
  },
  stepContainer: {
    gap: Spacing.three,
    alignSelf: "stretch",
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.four,
    borderRadius: Spacing.four,
  },
  button: {
    backgroundColor: "white",
    borderRadius: 20,
    width: "100%",
    paddingVertical: 10,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  btnText: {
    fontSize: 14,
    fontWeight: "bold",
  },
});
