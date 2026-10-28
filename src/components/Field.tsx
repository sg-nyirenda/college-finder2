import { colors } from "@/constants/theme";
import {
    StyleSheet,
    Text,
    TextInput,
    TextInputProps,
    View
} from "react-native";

type Props = TextInputProps & { label: string; error?: string };

export default function Field({ label, error, style, ...rest }: Props) {
  return (
    <View style={s.wrap}>
      <Text style={s.label}>{label}</Text>
      <TextInput
        placeholderTextColor={colors.muted}
        style={[s.input, error ? s.inputError : null, style]}
        {...rest}
      />
      {error ? <Text style={s.error}>{error}</Text> : null}
    </View>
  );
}

const s = StyleSheet.create({
  wrap: { marginTop: 14 },
  label: {
    fontSize: 16,
    fontWeight: "700",
    color: colors.text,
    marginBottom: 8
  },
  input: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    padding: 14,
    fontSize: 16,
    color: colors.text
  },
  inputError: { borderColor: colors.danger },
  error: { color: colors.danger, marginTop: 4 }
});
