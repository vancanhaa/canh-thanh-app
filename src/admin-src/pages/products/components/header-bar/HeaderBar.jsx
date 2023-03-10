import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./header-bar.scss";
import { Input, Menu, Select } from "antd";
import { fetchProductsListAdmin } from "../../../../stores/actions/productsAdmin.action";
import { changeTextSearch } from "../../../../stores/slice/productsAdmin.slice";
import { SHOP_BY_CATEGORY, SHOP_BY_PRICE } from "../../../../../constants";
import { getItem } from "../../../../../utils/menu";

function HeaderBar() {
  const productsAdminState = useSelector((state) => state.productsAdmin);
  const { listProducts, filter, textSearch } = productsAdminState;
  const { Search } = Input;
  const searchRef = useRef();
  const [valueSearch, setValueSearch] = useState("");
  const dispatch = useDispatch();
  const handleSearch = (value) => {
    let textSearch = value.trim();
    if (textSearch) {
      dispatch(fetchProductsListAdmin({ page: 1, limit: 10, textSearch }));
      dispatch(changeTextSearch(textSearch));
    }
    setValueSearch("");
    searchRef.current.blur();
  };
  const categorySelect = filter?.category ? filter?.category : "";

  const priceRangeSelect =
    SHOP_BY_PRICE.find(
      (item) =>
        item.price_gte === filter?.price_gte &&
        item.price_lte === filter?.price_lte
    )?.priceRange || 0;
  const sortValueSelect = filter?._order ? filter?._order : "default";
  const categories = SHOP_BY_CATEGORY.map((item) => {
    return { value: item.value, label: item.title };
  });
  const priceArr = SHOP_BY_PRICE.map((item) => {
    return {
      value: item.priceRange,
      label: item.title,
    };
  });

  const handleChangeCategory = (value) => {
    console.log(value);
    dispatch(
      fetchProductsListAdmin({
        page: 1,
        limit: 10,
        filter: { ...filter, category: value },
        textSearch,
      })
    );
  };

  const handleChangePrice = (value) => {
    const priceRangeObj = SHOP_BY_PRICE.find(
      (item) => item.priceRange === value
    );
    const filterPriceRange = {
      price_gte: priceRangeObj.price_gte,
      price_lte: priceRangeObj.price_lte,
    };
    dispatch(
      fetchProductsListAdmin({
        page: 1,
        limit: 10,
        textSearch,
        filter: { ...filter, ...filterPriceRange },
      })
    );
  };

  const handleSort = (value) => {
    if (value === "default") {
      dispatch(
        fetchProductsListAdmin({
          page: 1,
          limit: 10,
          filter: { ...filter, _sort: null, _order: null },
          textSearch,
        })
      );
    } else {
      dispatch(
        fetchProductsListAdmin({
          page: 1,
          limit: 10,
          filter: { ...filter, _sort: "price", _order: value },
          textSearch,
        })
      );
    }
  };

  return (
    <div className="header-bar">
      <div className="header-bar__left">
        <div className="header-bar__category">
          <div className="category-label">Lo???i s???n ph???m</div>
          <Select
            style={{
              minWidth: 110,
              marginLeft: 4,
            }}
            value={categorySelect}
            defaultValue=""
            onChange={handleChangeCategory}
            options={categories}
          />
        </div>
        <div className="header-bar__price">
          <div className="price-label">Kho???ng gi??</div>
          <Select
            onClick={handleChangePrice}
            style={{
              minWidth: 180,
              marginLeft: 4,
            }}
            value={priceRangeSelect}
            defaultValue={0}
            onChange={handleChangePrice}
            options={priceArr}
          />
        </div>
        <div className="header-bar__sort">
          <div className="sort-label">S???p x???p theo</div>
          <Select
            defaultValue=""
            value={sortValueSelect}
            style={{
              minWidth: 160,
              marginLeft: 4,
            }}
            onChange={handleSort}
            options={[
              {
                value: "default",
                label: "M???c ?????nh",
              },
              {
                value: "asc",
                label: "Gi?? t??? th???p ?????n cao",
              },
              {
                value: "desc",
                label: "Gi?? t??? cao ?????n th???p",
              },
            ]}
          />
        </div>
      </div>
      <div className="header-bar__right">
        <div className="header-bar__search">
          <Search
            ref={searchRef}
            placeholder="T??m ki???m"
            onSearch={handleSearch}
            enterButton
            value={valueSearch}
            onChange={(e) => setValueSearch(e.target.value)}
          />
        </div>
        <div className="header-bar__add-product">
          <button>Th??m s???n ph???m</button>
        </div>
      </div>
    </div>
  );
}

export default HeaderBar;
