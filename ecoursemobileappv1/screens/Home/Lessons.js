import { Text } from "react-native";
import Styles from "../../styles/Styles";

const Lessons = ({route}) => {
    const courseId = route.params?.courseId;

    return (
        <Text style={Styles.subject}>DANH SÁCH BÀI HỌC {courseId}</Text>
    );
}

export default Lessons;