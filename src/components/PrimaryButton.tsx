import { colors } from "@/constants/theme";
import { ActivityIndicator, Pressable, StyleSheet, Text } from "react-native";

type Props = {
  title: string;
  onPress: () => void;
  loading?: boolean;
  disabled?: boolean;
};

export default function PrimaryButton({
  title,
  onPress,
  loading,
  disabled
}: Props) {
  const off = loading || disabled;
  return (
    <Pressable
      style={[s.button, off && s.off]}
      onPress={onPress}
      disabled={off}
    >
      {loading ? (
        <ActivityIndicator color="#fff" />
      ) : (
        <Text style={s.text}>{title}</Text>
      )}
    </Pressable>
  );
}

const s = StyleSheet.create({
  button: {
    backgroundColor: colors.blue,
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: "center",
    marginTop: 24
  },
  off: { opacity: 0.6 },
  text: { color: "#fff", fontSize: 17, fontWeight: "700" }
});
