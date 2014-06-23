using Newtonsoft.Json.Linq;

namespace SirTrevor.ExtensionMethods {

    public static class JObjectExtensionMethods {

        public static string GetString(this JObject obj, string name) {
            if (obj == null || name == null) return null;
            JToken token = obj[name];
            return token == null ? null : token.Value<string>();
        }

        public static int GetInt32(this JObject obj, string name) {
            return GetTValue<int>(obj, name);
        }

        public static T GetTValue<T>(this JObject obj, string name) {
            if (obj == null || name == null) return default(T);
            JToken token = obj[name];
            return token == null ? default(T) : token.Value<T>();
        }

    }

}