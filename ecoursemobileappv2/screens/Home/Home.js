import { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Image, Text, View } from "react-native";
import Apis, { endpoints } from "../../configs/Apis";
import { List, Searchbar } from "react-native-paper";
import Styles from "../../styles/Styles";

const Home = ({cateId}) => {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(false);
    const [q, setQ] = useState("");
    const [page, setPage] = useState(1);

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
            if (page === 1)
                setCourses(res.data.results);
            else if (page > 1)
                setCourses([...courses, ...res.data.results]);

            if (res.data.next === null)
                setPage(0);
        } catch (ex) {

        } finally {
            setTimeout(() => {setLoading(false);}, 1000)
        }
    }

    useEffect(() => {
        let timer = setTimeout(() => {
            if (page > 0)
                loadCourses();
        }, 500);

        return () => clearTimeout(timer);
    }, [q, cateId, page]);

    const loadMore = () => {
        if (page > 0 && !loading)
            setPage(page + 1);
    }

    return (
        <View>
            <Searchbar value={q} onChangeText={setQ}
                placeholder="Tìm khóa học" />

            <FlatList onEndReached={loadMore}
                    data={courses} ListFooterComponent={loading && <ActivityIndicator />}
                    renderItem={({item}) => <List.Item
                                title={item.subject}
                                description={item.created_date}
                                left={props => <Image style={Styles.avatar} source={{uri: item.image}} />}
                            />} />
            
        </View>
    );
}

export default Home;