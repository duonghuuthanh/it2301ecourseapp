import { ActivityIndicator, Image, ScrollView, Text, View } from "react-native";
import Styles from "../../styles/Styles";
import Apis, { authApis, endpoints } from "../../configs/Apis";
import { useContext, useEffect, useState } from "react";
import { Button, Card, List, TextInput } from "react-native-paper";
import RenderHTML from "@native-html/render";
import moment from "moment";
import 'moment/locale/vi';
import { MyUserContext } from "../../configs/Contexts";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Link } from "@react-navigation/native";

const LessonDetails = ({route}) => {
    const lessonId = route.params?.lessonId;
    const [loading, setLoading] = useState(false)
    const [lesson, setLesson] = useState();
    const [comments, setComments] = useState([]);
    const [user, ] = useContext(MyUserContext);
    const [content, setContent] = useState();

    const loadLesson = async () => {
        let res = await Apis.get(endpoints['lesson-details'](lessonId));
        setLesson(res.data);
    }

    const loadComments = async () => {
        let res = await Apis.get(endpoints['comments'](lessonId));
        setComments(res.data.results);
    }

    useEffect(() => {
        loadLesson();
        loadComments();
    }, [lessonId]);

    const addComment = async () => {
        let token = await AsyncStorage.getItem('token')
        let res = await authApis(token).post(endpoints['comments'], {
            'content': content
        });

        setComments([res.data, ...comments]);
    }

    return (
        <ScrollView>
            <Text style={Styles.subject}>CHI TIẾT BÀI HỌC {lessonId}</Text>
            {loading === false && <ActivityIndicator />}

            {lesson && <>
                <Card>
                    <Card.Cover source={{ uri: lesson.image }} />
                    <Card.Title title={lesson.subject} />
                    <Card.Content>
                        {/* <Text variant="titleLarge">{lesson.content}</Text> */}
                        <RenderHTML source={{html: lesson.content}} />
                        <Text variant="bodyMedium">{lesson.created_date}</Text>
                    </Card.Content>
                </Card>
            </>}

            {user === null ? <>
                <Text>Vui lòng <Link to="login">đăng nhập</Link> để bình luận!</Text>
            </>:<>
                <View>
                    <TextInput placeholder="Nội dung bình luận..." value={content} onChangeText={setContent} />
                    <Button onPress={addComment}>Bình luận</Button>
                </View>
            </>}
            

            {comments.map(c => <List.Item  title={c.content}
                                description={moment(c.created_date).fromNow()}
                                left={() => <Image style={Styles.avatar} source={{uri: c.user.avatar}} />} /> )}

            
        </ScrollView>
    );
}

export default LessonDetails;