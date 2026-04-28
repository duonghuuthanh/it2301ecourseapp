import { Text, View } from "react-native";
import Styles from "../../styles/Styles";

const LessonDetails = ({route}) => {
    const lessonId = route.params?.lessonId;

    return (
        <View>
            <Text style={Styles.subject}>CHI TIẾT BÀI HỌC {lessonId}</Text>
        </View>
    );
}

export default LessonDetails;