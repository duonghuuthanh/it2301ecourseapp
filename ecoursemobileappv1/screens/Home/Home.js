import { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Image, TouchableOpacity, View } from "react-native";
import Apis, { endpoints } from "../../configs/Apis";
import { List, Searchbar } from "react-native-paper";
import Styles from "../../styles/Styles";
import { useNavigation } from "@react-navigation/native";

const Home = ({cateId}) => {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(false);
    const [q, setQ] = useState("");
    const [page, setPage] = useState(1);
    const nav = useNavigation();

    const loadCourses = async () => {
        try {
            setLoading(true);

            let url = `${endpoints['courses']}?page=${page}`;
            if (q) {
                url = `${url}&q=${q}`;
            }
            if (cateId) {
                url = `${url}&category_id=${cateId}`;
            }
            console.info(url);
            let res = await Apis.get(url);
            if (res.data.next === null)
                setPage(0);

            if (page === 1)
                setCourses(res.data.results);
            else if (page > 1)
                setCourses([...courses, ...res.data.results]);
        } catch (ex) {

        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        let timer = setTimeout(() => {
            if (page > 0)
                loadCourses();
        }, 500);

        return () => clearTimeout(timer);
    }, [q, cateId, page]);

    useEffect(() => {
        setPage(1);
    }, [q, cateId]);

    const loadMore = () => {
        if (page > 0 && !loading)
            setPage(page + 1);
    }

    return (
        <View>
            <Searchbar value={q} onChangeText={setQ}
                placeholder="Tìm khóa học..." />

            <FlatList onEndReached={loadMore} 
                    ListFooterComponent={loading && <ActivityIndicator />} 
                    data={courses} renderItem={ ({item}) => <List.Item
                                                                    title={item.subject}
                                                                    description={item.created_date}
                                                                    left={() => <TouchableOpacity onPress={() => nav.navigate('lessons', {'courseId': item.id})}>
                                                                        <Image style={Styles.avatar} source={{uri: item.image}} />
                                                                    </TouchableOpacity>}
                                                                />} />
            
        </View>
    );
}

export default Home;