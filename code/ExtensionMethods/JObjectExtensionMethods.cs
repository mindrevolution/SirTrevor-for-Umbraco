using System;
using System.Linq;
using Newtonsoft.Json.Linq;

namespace SirTrevor.ExtensionMethods {

    public static class JObjectExtensionMethods {

        public static string GetString(this JObject obj, string name) {
            if (obj == null || name == null) return null;
            JToken token = obj[name];
            return token == null ? null : token.Value<string>();
        }

        public static T GetString<T>(this JObject obj, string name, Func<string, T> func) {
            if (obj == null || name == null) return default(T);
            JToken token = obj[name];
            return token == null ? default(T) : func(token.Value<string>());
        }

        public static int GetInt32(this JObject obj, string name) {
            return GetTValue<int>(obj, name);
        }

        public static long GetInt64(this JObject obj, string name) {
            return GetTValue<long>(obj, name);
        }

        public static T GetTValue<T>(this JObject obj, string name) {
            if (obj == null || name == null) return default(T);
            JToken token = obj[name];
            return token == null ? default(T) : token.Value<T>();
        }

        public static T GetObject<T>(this JObject obj, string name, Func<JObject, T> func) {
            if (obj == null || name == null) return default(T);
            JObject token = obj[name] as JObject;
            return token == null ? default(T) : func(token);
        }

        public static JArray GetArray(this JObject obj, string name) {
            if (obj == null || name == null) return null;
            return obj[name] as JArray;
        }

        public static T[] GetArray<T>(this JObject obj, string name, Func<JObject, T> func) {
            if (obj == null || name == null) return null;
            JArray array = obj[name] as JArray;
            return array == null ? new T[0] : (from JObject entry in array select func(entry)).ToArray();
        }

    }
}