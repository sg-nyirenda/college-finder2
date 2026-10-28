import { colors } from "@/constants/theme";
import { supabase } from "@/lib/supabase";
import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import {
    ActivityIndicator,
    Alert,
    Linking,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    View
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function CollegeDetails() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [college, setCollege] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [phone, setPhone] = useState("+265");

  useEffect(() => {
    supabase
      .from("colleges")
      .select("*")
      .eq("id", id)
      .single()
      .then(({ data }) => {
        setCollege(data);
        setLoading(false);
      });
  }, [id]);

  if (loading)
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={colors.blue} />
      </View>
    );
  if (!college)
    return (
      <View style={styles.center}>
        <Text>College not found.</Text>
      </View>
    );

  // Function to handle getting the form link
  const handleGetForm = async () => {
    if (!phone.startsWith("+265") || phone.length < 13) {
      return Alert.alert(
        "Invalid Number",
        "Please use the format +265XXXXXXXXX"
      );
    }

    // Here we simulate sending the link. In a real app, you would save this to Supabase.
    Alert.alert(
      "Link Sent!",
      `A download link for the application form has been sent to ${phone}.\n\n(Test Mode: Tap below to open the PDF now)`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Open Form PDF",
          onPress: () =>
            Linking.openURL(
              "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"
            )
        }
      ]
    );
  };

  return (
    <SafeAreaView style={styles.screen} edges={["top"]}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable style={styles.backBtn} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color={colors.navy} />
        </Pressable>
        <Text style={styles.headerTitle}>Details</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {/* College Info */}
        <Text style={styles.name}>{college.name}</Text>
        <View style={styles.infoRow}>
          <Ionicons name="location" size={18} color={colors.blue} />
          <Text style={styles.infoText}>{college.location}</Text>
        </View>
        <View style={styles.infoRow}>
          <Ionicons name="call" size={18} color={colors.blue} />
          <Text style={styles.infoText}>
            {college.phone || "No phone provided"}
          </Text>
        </View>

        {/* Programs List */}
        <Text style={styles.sectionTitle}>Programs Offered</Text>
        <View style={styles.programsBox}>
          {college.programs?.map((prog: string, index: number) => (
            <View key={index} style={styles.programItem}>
              <Ionicons name="checkmark-circle" size={18} color={colors.blue} />
              <Text style={styles.programText}>{prog}</Text>
            </View>
          ))}
        </View>

        {/* Get Form Section */}
        <Text style={styles.sectionTitle}>Get Application Form</Text>
        <Text style={{ fontSize: 14, color: colors.muted, marginBottom: 10 }}>
          Enter your phone number to receive the download link.
        </Text>
        <TextInput
          style={styles.input}
          value={phone}
          onChangeText={setPhone}
          keyboardType="phone-pad"
          placeholder="+265991234567"
        />
        <Pressable style={styles.submitBtn} onPress={handleGetForm}>
          <Text style={styles.submitText}>Send Form Link</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  screen: { flex: 1, backgroundColor: colors.bg },
  header: { flexDirection: "row", alignItems: "center", padding: 20 },
  backBtn: {
    padding: 8,
    backgroundColor: "#fff",
    borderRadius: 20,
    marginRight: 15
  },
  headerTitle: { fontSize: 20, fontWeight: "bold", color: colors.navy },
  content: { padding: 20, paddingTop: 0 },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    color: colors.text,
    marginBottom: 15
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    gap: 8
  },
  infoText: { fontSize: 15, color: colors.text },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.navy,
    marginTop: 25,
    marginBottom: 10
  },
  programsBox: {
    backgroundColor: "white",
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.border
  },
  programItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
    gap: 8
  },
  programText: { fontSize: 15, color: colors.text },
  input: {
    backgroundColor: "white",
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.border,
    fontSize: 16,
    marginBottom: 15
  },
  submitBtn: {
    backgroundColor: colors.blue,
    padding: 15,
    borderRadius: 10,
    alignItems: "center"
  },
  submitText: { color: "white", fontWeight: "bold", fontSize: 16 }
});
