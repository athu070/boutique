import React, { useCallback, memo } from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Image,
  Text,
  ListRenderItem,
  Dimensions
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StarIcon } from '../components';
import productsData from '../data/products.json';
import { RootStackParamList, Product, ProductsData } from '../types';

type ProductListScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'ProductList'>;
};

interface ProductCardProps {
  item: Product;
  onPress: () => void;
  width: number;
}

const { width } = Dimensions.get('window');
const numColumns = width > 600 ? 2 : 1;
const ITEM_HEIGHT = 360;
const PADDING = 16;
const CARD_MARGIN = 8;

const cardWidth = numColumns > 1 
  ? (width - (PADDING * 2) - (CARD_MARGIN * (numColumns + 1))) / numColumns 
  : width - (PADDING * 2);

const ProductCard = memo(({ item, onPress, width }: ProductCardProps) => (
  <TouchableOpacity
    style={[
      styles.productCard,
      { width: width }
    ]}
    onPress={onPress}
  >
    <Image
      source={{ uri: item.image }}
      style={styles.productImage}
      resizeMode="cover"
    />
    <View style={styles.productInfo}>
      <View style={styles.header}>
        <Text style={styles.category} numberOfLines={1}>
          {item.category}
        </Text>
        <View style={[
          styles.stockBadge,
          { backgroundColor: item.inStock ? '#E8F5E9' : '#FFEBEE' }
        ]}>
          <Text style={[
            styles.stockText,
            { color: item.inStock ? '#2E7D32' : '#C62828' }
          ]}>
            {item.inStock ? 'In Stock' : 'Out of Stock'}
          </Text>
        </View>
      </View>

      <Text style={styles.productName} numberOfLines={2}>
        {item.name}
      </Text>

      <View style={styles.ratingContainer}>
        <StarIcon size={16} />
        <Text style={styles.ratingValue}>{item.rating.toFixed(1)}</Text>
      </View>

      <View style={styles.footer}>
        <Text style={styles.price}>${item.price.toFixed(2)}</Text>
        <Text style={styles.brand} numberOfLines={1}>
          {item.specifications.brand}
        </Text>
      </View>
    </View>
  </TouchableOpacity>
));

ProductCard.displayName = 'ProductCard';

const ProductListScreen: React.FC<ProductListScreenProps> = ({ navigation }) => {
  const { products } = productsData as ProductsData;

  const getItemLayout = useCallback((
    _data: ArrayLike<Product> | null | undefined,
    index: number
  ) => ({
    length: ITEM_HEIGHT,
    offset: ITEM_HEIGHT * index,
    index,
  }), []);

  const keyExtractor = useCallback((item: Product) => 
    item.id.toString(), 
  []);

  const renderItem: ListRenderItem<Product> = useCallback(({ item }) => (
    <ProductCard
      item={item}
      width={cardWidth}
      onPress={() => navigation.navigate('ProductDetails', { product: item })}
    />
  ), [navigation]);

  return (
    <View style={styles.container}>
      <FlatList<Product>
        data={products}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        getItemLayout={getItemLayout}
        windowSize={5}
        maxToRenderPerBatch={10}
        removeClippedSubviews={true}
        initialNumToRender={6}
        contentContainerStyle={styles.listContainer}
        numColumns={numColumns}
        key={numColumns.toString()}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  listContainer: {
    padding: PADDING,
    gap: CARD_MARGIN,
  },
  productCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    marginBottom: CARD_MARGIN,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    overflow: 'hidden',
  },
  productImage: {
    width: '100%',
    height: 180,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    backgroundColor: '#f9f9f9',
  },
  productInfo: {
    padding: 12,
    flex: 1,
    justifyContent: 'space-between',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
    gap: 8,
  },
  category: {
    fontSize: 12,
    color: '#666',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    flex: 1,
  },
  stockBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  stockText: {
    fontSize: 10,
    fontWeight: '600',
  },
  productName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    color: '#333',
    lineHeight: 22,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  ratingValue: {
    marginLeft: 4,
    fontSize: 14,
    color: '#666',
  },
  footer: {
    marginTop: 'auto',
  },
  price: {
    fontSize: 18,
    fontWeight: '700',
    color: '#2196F3',
    marginBottom: 4,
  },
  brand: {
    fontSize: 12,
    color: '#666',
  },
});

export default memo(ProductListScreen);