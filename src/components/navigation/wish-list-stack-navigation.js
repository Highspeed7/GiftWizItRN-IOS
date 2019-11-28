import StoreSelector from '../store-selector/store-selector';
import { createStackNavigator } from 'react-navigation-stack';

const WishListModalStack = createStackNavigator({
    "StoreSelector": {
        screen: StoreSelector
    }
},
{
    headerMode: 'none'
});

export default WishListModalStackNavigator = createStackNavigator({
    "WishListModals": {
        screen: WishListModalStack
    }
},
{
    headerMode: 'none',
    mode: 'modal'
});