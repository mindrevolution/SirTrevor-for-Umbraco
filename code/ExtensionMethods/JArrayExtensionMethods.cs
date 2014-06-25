using Newtonsoft.Json.Linq;

namespace SirTrevor.ExtensionMethods {
    
    public static class JArrayExtensionMethods {

        public static int GetInt32(this JArray array, int index) {
            return GetTValue<int>(array, index);
        }

        public static long GetInt64(this JArray array, int index) {
            return GetTValue<long>(array, index);
        }

        public static T GetTValue<T>(this JArray array, int index) {
            if (array == null) return default(T);
            JToken token = array[index];
            return token == null ? default(T) : token.Value<T>();
        }

    }

}