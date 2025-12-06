import { Redirect } from "expo-router";

export default function Index() {
  // In here later we will conditionally redirect to the home screen if the user is logged in and to the login screen if the user is not logged in
  return <Redirect href="/(auth)/login" />;
}
