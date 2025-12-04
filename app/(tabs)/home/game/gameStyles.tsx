import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
	background: {
		flex: 1,
		width: "100%",
		height: "100%",
	},
	container: {
		flex: 1,
		paddingHorizontal: 20,
		justifyContent: "space-between"},
	button: {
		borderRadius: 24,
		alignSelf: "center",
		marginTop: 20,
		marginBottom: 20,
	},
	textContainer: {
		padding: 16,
		borderRadius: 12,
		backgroundColor: "rgba(255, 255, 255, 0.8)", // translucent white
		marginTop: 10,
		marginBottom: 10,
		borderColor: "#00629F",
		borderWidth: 2,
	},
	textContainerStyle: {
		color: "#000000",
		fontSize: 16,
	},
	answer: {
		padding: 16,
		borderRadius: 20,
		marginVertical: 6,
	},

	scrollViewStyle: {
		flex: 1,
		paddingHorizontal: 20,
	},
	contentContainer: {
		flexGrow: 1,
		justifyContent: "center",
		alignItems: "center",
		padding: 10,
	},
	bold: {
		fontWeight: "bold",
	},

	quiz_image: {
		height: 250,
		aspectRatio: 1,
		alignSelf: "center",
	},
	marginTop190: {
		marginTop: 190,
	},
	title: {
		color: "#00629F", // main color
		fontSize: 16, // large size
		fontWeight: "bold", // make it bold
		textAlign: "center", // center above image
		textShadowColor: "rgba(0, 0, 0, 0.25)", // subtle shadow
		textShadowOffset: { width: 2, height: 2 },
		textShadowRadius: 4,
		letterSpacing: 1, // space between letters
		textTransform: "uppercase", // optional uppercase
		backgroundColor: "white",
		padding: 10,
		borderRadius: 20,
		borderColor: "#00629F",
		borderWidth: 10,
		marginBottom: 20,
	},
	basicTitle: {
		fontSize: 22,
		fontWeight: "700",
		marginBottom: 8,
	},
	quiz_link: {
		fontSize: 16,
		lineHeight: 24,
		color: "#0066cc",
		textDecorationLine: "underline",
	},

	answerContainer: {
		marginBottom: 24,
		marginHorizontal: 10,
	},

	image: {
		marginTop: 120,
		width: 200,
		height: 200,
		marginBottom: 20,
		alignSelf: "center",
	},

	text: {
		textAlign: "center",
		fontSize: 16,
		marginBottom: 10,
		fontWeight: "bold",
	},
	score: {
		textAlign: "center",
		fontSize: 30,
		marginBottom: 10,
		fontWeight: "bold",
	},





	

	description: {
		fontSize: 16,
		marginBottom: 16,
	},
	wideImage: {
		width: "100%",
		height: 280,
		borderRadius: 16,
		marginBottom: 16,
	},
	flex2: {
		flex: 2,
	},


});
