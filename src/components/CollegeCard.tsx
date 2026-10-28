import { colors } from "@/constants/theme";
import type { College } from "@/lib/types";
import { Ionicons } from "@expo/vector-icons";
import { Pressable, StyleSheet, Text, View } from "react-native";

type Props = { college: College; onPress: () => void; onApply: () => void };

export default function CollegeCard({ college, onPress, onApply }: Props) {
  return (
    <Pressable style={s.card} onPress={onPress}>
      {/* Left side: Image placeholder */}
      <View style={s.imagePlaceholder}>
        <Ionicons name="school" size={32} color="#fff" />
      </View>

      {/* Middle: Details */}
      <View style={s.details}>
        <Text style={s.name} numberOfLines={1}>
          {college.name}
        </Text>

        <View style={s.row}>
          <Ionicons name="location" size={14} color={colors.blue} />
          <Text style={s.metaText}> Location: {college.location}</Text>
        </View>

        <View style={s.row}>
          <Ionicons name="book" size={14} color={colors.blue} />
          <Text style={s.metaText}> Programs: {college.programs.length}</Text>
        </View>

        <Text style={s.typeText}>{college.type}</Text>
      </View>

      {/* Right side: Apply Button */}
      <View style={s.actionCol}>
        <Pressable style={s.applyBtn} onPress={onApply}>
          <Text style={s.applyBtnText}>Apply Now</Text>
        </Pressable>
      </View>
    </Pressable>
  );
}

const s = StyleSheet.create({
  card: {
    flexDirection: "row",
    backgroundColor: colors.card,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 12,
    marginBottom: 12,
    alignItems: "center"
  },
  imagePlaceholder: {
    width: 70,
    height: 70,
    borderRadius: 8,
    backgroundColor: colors.sky,
    alignItems: "center",
    justifyContent: "center"
  },
  details: {
    flex: 1,
    marginLeft: 12,
    justifyContent: "center"
  },
  name: {
    fontSize: 15,
    fontWeight: "800",
    color: colors.text,
    marginBottom: 4
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 2
  },
  metaText: {
    fontSize: 12,
    color: colors.muted
  },
  typeText: {
    fontSize: 11,
    color: colors.blue,
    fontWeight: "600",
    marginTop: 4
  },
  actionCol: {
    justifyContent: "center",
    paddingLeft: 8
  },
  applyBtn: {
    backgroundColor: colors.blue,
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 8
  },
  applyBtnText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "700"
  }
});
