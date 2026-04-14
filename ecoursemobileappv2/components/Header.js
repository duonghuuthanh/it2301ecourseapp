import { useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import Apis, { endpoints } from "../configs/Apis";
import { Chip } from "react-native-paper";
import Styles from "../styles/Styles";

const Header = ({setCateId}) => {
    const [categories, setCategories] = useState([]);

    const loadCategories = async () => {
        try {
            let res = await Apis.get(endpoints['categories']);
            setCategories(res.data);
        } catch (ex) {
            console.error(ex);
        }
    }

    useEffect(() => {
        loadCategories();
    }, []);

    return (
        <View style={[Styles.row, Styles.wrap]}>
            <TouchableOpacity onPress={() => setCateId(null)} style={Styles.padding}>
                <Chip icon="label">Tất cả</Chip>
            </TouchableOpacity>

            {categories.map(c => <TouchableOpacity onPress={() => setCateId(c.id)} style={Styles.padding}  key={c.id}>
                <Chip icon="label">{c.name}</Chip>
            </TouchableOpacity>)}
        </View>
    );
}

export default Header;