import { Button, SKATE } from "@skatehubba/ui";
import { functions } from "@skatehubba/utils";
import { httpsCallable } from "firebase/functions";
import { useState } from "react";
import { FlatList, StyleSheet, Text, TextInput, View } from "react-native";

const heshurChat = httpsCallable(functions, "heshurChat");

export default function Heshur() {
  const [messages, setMessages] = useState<
    { role: "user" | "heshur"; content: string }[]
  >([]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMsg = input;
    setMessages((prev) => [...prev, { role: "user", content: userMsg }]);
    setInput("");

    try {
      const response = await heshurChat({ message: userMsg });
      setMessages((prev) => [
        ...prev,
        { role: "heshur", content: response.data as string },
      ]);
    } catch (error) {
      console.error(error);
      setMessages((prev) => [
        ...prev,
        { role: "heshur", content: "Sorry, I bailed on that one. Try again?" },
      ]);
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={messages}
        keyExtractor={(_, i) => i.toString()}
        renderItem={({ item }) => (
          <Text
            style={[
              styles.msg,
              item.role === "heshur" ? styles.heshurMsg : styles.userMsg,
            ]}
          >
            <Text style={styles.role}>
              {item.role === "heshur" ? "👹 Heshur: " : "You: "}
            </Text>
            {item.content}
          </Text>
        )}
        contentContainerStyle={styles.listContent}
      />
      <View style={styles.inputContainer}>
        <TextInput
          value={input}
          onChangeText={setInput}
          style={styles.input}
          placeholder="Ask Heshur..."
          placeholderTextColor="#666"
        />
        <View style={styles.buttonWrapper}>
          <Button label="Send" onPress={sendMessage} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: SKATE.colors.paper },
  listContent: { padding: 20 },
  msg: {
    fontSize: 16,
    marginBottom: 10,
    padding: 10,
    borderRadius: 8,
    overflow: "hidden",
  },
  heshurMsg: { backgroundColor: SKATE.colors.grime, color: SKATE.colors.paper },
  userMsg: {
    backgroundColor: "#ddd",
    color: SKATE.colors.ink,
    alignSelf: "flex-end",
  },
  role: { fontWeight: "bold" },
  inputContainer: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: "#ccc",
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    flex: 1,
    borderColor: SKATE.colors.grime,
    borderWidth: 1,
    padding: 10,
    borderRadius: 8,
    marginRight: 10,
    color: SKATE.colors.ink,
  },
  buttonWrapper: { width: 80 },
});
