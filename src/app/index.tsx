import { colors } from "@/constants/theme";
import { supabase } from "@/lib/supabase";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Home() {
  const [colleges, setColleges] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchColleges();
  }, []);

  const fetchColleges = async () => {
    setLoading(true);
    setErrorMsg("");

    try {
      const { data, error } = await supabase
        .from("colleges")
        .select("*")
        .order("name");

      if (error) {
        setErrorMsg(`Supabase Error: ${error.message}`);
      } else if (data) {
        setColleges(data);
      }
    } catch (err: any) {
      setErrorMsg(
        `Network Error: ${err.message}. Check your internet connection.`
      );
    }

    setLoading(false);
  };

  // --- SEARCH LOGIC ---
  // This filters the list based on the college name OR the programs array
  const filteredColleges = colleges.filter((college) => {
    const query = searchQuery.toLowerCase();

    // Check if college name matches
    const nameMatches = college.name.toLowerCase().includes(query);

    // Check if ANY program inside the programs array matches
    const programMatches = college.programs?.some((program: string) =>
      program.toLowerCase().includes(query)
    );

    return nameMatches || programMatches;
  });

  return (
    <SafeAreaView style={styles.screen} edges={["top"]}>
      <Text style={styles.headerTitle}>CollegeFinder</Text>
      <Text style={styles.subtitle}>
        Search for a college or a program (e.g., "Welding")
      </Text>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Ionicons
          name="search"
          size={20}
          color={colors.muted}
          style={styles.searchIcon}
        />
        <TextInput
          style={styles.searchInput}
          placeholder="Search colleges or programs..."
          placeholderTextColor={colors.muted}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        {searchQuery.length > 0 && (
          <Pressable onPress={() => setSearchQuery("")}>
            <Ionicons name="close-circle" size={20} color={colors.muted} />
          </Pressable>
        )}
      </View>

      {loading ? (
        <ActivityIndicator
          size="large"
          color={colors.blue}
          style={{ marginTop: 40 }}
        />
      ) : errorMsg ? (
        <View style={styles.errorBox}>
          <Text style={{ color: colors.danger, fontWeight: "bold" }}>
            Connection Failed
          </Text>
          <Text style={{ color: colors.danger, marginTop: 5 }}>{errorMsg}</Text>
          <Pressable
            onPress={fetchColleges}
            style={{
              marginTop: 10,
              backgroundColor: colors.danger,
              padding: 10,
              borderRadius: 8
            }}
          >
            <Text
              style={{
                color: "white",
                textAlign: "center",
                fontWeight: "bold"
              }}
            >
              Try Again
            </Text>
          </Pressable>
        </View>
      ) : filteredColleges.length === 0 ? (
        <Text style={styles.noResultsText}>
          No colleges found matching "{searchQuery}"
        </Text>
      ) : (
        <FlatList
          data={filteredColleges}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingBottom: 20 }}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <Pressable
              style={styles.card}
              onPress={() =>
                router.push({
                  pathname: "/college/[id]",
                  params: { id: item.id }
                })
              }
            >
              <View style={styles.cardIcon}>
                <Ionicons name="school" size={24} color="white" />
              </View>
              <View style={{ flex: 1, marginLeft: 15 }}>
                <Text style={styles.cardTitle}>{item.name}</Text>
                <Text style={styles.cardSub}>
                  <Ionicons name="location" size={12} /> {item.location}
                </Text>

                {/* Show a preview of matching programs if they searched for a program */}
                {searchQuery.length > 0 &&
                  item.programs?.some((p: string) =>
                    p.toLowerCase().includes(searchQuery.toLowerCase())
                  ) && (
                    <View style={styles.programMatchBadge}>
                      <Text style={styles.programMatchText}>
                        Offers:{" "}
                        {item.programs.find((p: string) =>
                          p.toLowerCase().includes(searchQuery.toLowerCase())
                        )}
                      </Text>
                    </View>
                  )}
              </View>
              <Ionicons name="chevron-forward" size={20} color={colors.muted} />
            </Pressable>
          )}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.bg, padding: 20 },
  headerTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: colors.navy,
    marginBottom: 5
  },
  subtitle: { fontSize: 14, color: colors.muted, marginBottom: 15 },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    borderWidth: 2,
    borderColor: colors.blue,
    borderRadius: 10,
    paddingHorizontal: 12,
    marginBottom: 20
  },
  searchIcon: { marginRight: 8 },
  searchInput: { flex: 1, height: 45, fontSize: 16, color: colors.text },
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    padding: 15,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colors.border
  },
  cardIcon: {
    width: 45,
    height: 45,
    borderRadius: 10,
    backgroundColor: colors.blue,
    alignItems: "center",
    justifyContent: "center"
  },
  cardTitle: { fontSize: 16, fontWeight: "bold", color: colors.text },
  cardSub: { fontSize: 13, color: colors.muted, marginTop: 4 },
  errorBox: { backgroundColor: "#FEE2E2", padding: 15, borderRadius: 10 },
  noResultsText: {
    textAlign: "center",
    marginTop: 20,
    color: colors.muted,
    fontSize: 15
  },
  programMatchBadge: {
    backgroundColor: "#DBEAFE",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    marginTop: 6,
    alignSelf: "flex-start"
  },
  programMatchText: { fontSize: 12, color: colors.blue, fontWeight: "bold" }
});
