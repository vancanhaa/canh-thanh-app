/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import MainLayout from "../../../layouts/main-layout/MainLayout";
import "./product.scss";
import { Col, notification, Pagination, Row, Select } from "antd";
import Menubar from "./components/menu-bar/Menubar";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductList } from "../../../stores/actions/product.action";
import { v4 } from "uuid";
import common from "../../../utils/common";
import ModalAddCart from "../../../components/modal-add-cart/ModalAddCart";
import { ROUTE } from "../../../constants";
import ProductItem from "../../../components/product-item/ProductItem";
import { SHOP_BY_CATEGORY, SHOP_BY_PRICE } from "../../../constants";
import { CloseCircleOutlined } from "@ant-design/icons";
function Product() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userInfo = useSelector((state) => state.user.userInfoState.data);
  const productState = useSelector((state) => state.product);
  const { products, textSearch, filter, pagination } = productState;
  const { page, limit, total } = pagination;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [page])
  const sortValueSelect = filter?._order ? filter?._order : "default";
  useEffect(() => {
    dispatch(fetchProductList({ page: 1, limit: 12, textSearch }));
  }, [textSearch]);
  const categoryTitleSearch = SHOP_BY_CATEGORY.find(
    (item) => item.value === filter?.category
  )?.title;
  const priceRangeSearch = SHOP_BY_PRICE.find(
    (item) =>
      item.price_gte === filter?.price_gte &&
      item.price_lte === filter?.price_lte
  )?.title;
  const categorySelect = filter?.category ? filter?.category : "";
  const priceRangeSelect =
    SHOP_BY_PRICE.find(
      (item) =>
        item.price_gte === filter?.price_gte &&
        item.price_lte === filter?.price_lte
    )?.priceRange || 0;
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
      fetchProductList({
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
      fetchProductList({
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
        fetchProductList({
          page: 1,
          limit: 12,
          filter: { ...filter, _sort: null, _order: null },
          textSearch,
        })
      );
    } else {
      dispatch(
        fetchProductList({
          page: 1,
          limit: 12,
          filter: { ...filter, _sort: "price", _order: value },
          textSearch,
        })
      );
    }
  };

  console.log(filter);
  const [openAddCartModal, setOpenAddCartModal] = useState(false);
  const [idProduct, setIdProduct] = useState(null);
  const handleOpenAddCartModal = (id) => {
    if (!userInfo) {
      notification.warning({
        message: "B???n c???n ????ng nh???p tr?????c khi mua h??ng!",
        style: { border: "3px solid #fcaf17" },
        duration: 2,
      });
      navigate(ROUTE.LOGIN);
      return;
    }
    setIdProduct(id);
    setOpenAddCartModal(true);
  };

  return (
    <MainLayout>
      <div className="product">
        <div className="product-container">
          <Row justify="space-between" gutter={[8, 0]}>
            <Col lg={5} md={6} sm={0} xs={0}></Col>
            <Col lg={19} md={18} sm={24} xs={24}>
              {textSearch ? (
                <div className="search-product">
                  Hi???n th???{" "}
                  <span className="number-product__search">{total}</span> k???t
                  qu??? t??m ki???m cho t??? kh??a &quot;
                  <span className="text-filter">{textSearch}</span>&quot;{" "}
                  {filter?.category ? (
                    <>
                      , lo???i s???n ph???m &quot;<span>{categoryTitleSearch}</span>
                      &quot;
                    </>
                  ) : (
                    ""
                  )}
                  {filter?.price_gte || filter?.price_lte ? (
                    <>
                      , kho???ng gi?? &quot;<span>{priceRangeSearch}</span>&quot;
                    </>
                  ) : (
                    ""
                  )}
                  <div
                    className="delete-search__btn"
                    onClick={() =>
                      dispatch(fetchProductList({ page: 1, limit: 12 }))
                    }
                  >
                    <CloseCircleOutlined />
                  </div>
                </div>
              ) : (
                <div className="search-product"></div>
              )}
            </Col>
            <Col lg={5} md={6} sm={0} xs={0}>
              <Menubar />
            </Col>
            <Col lg={19} md={18} sm={24} xs={24}>
              <div className="product-topbar">
                <div className="header-bar__category">
                  <div className="category-label">Lo???i s???n ph???m</div>
                  <Select
                    style={{
                      minWidth: 180,
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
                    defaultValue="default"
                    value={sortValueSelect}
                    style={{
                      minWidth: 180,
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
              <div className="product-list">
                <Row justify="start" gutter={[16, 24]}>
                  {products.map((item, index) => (
                    <Col key={v4()} lg={6} md={8} sm={12} xs={12}>
                      <ProductItem
                        item={item}
                        handleOpenAddCartModal={handleOpenAddCartModal}
                      />
                    </Col>
                  ))}
                </Row>
              </div>
            </Col>
          </Row>
        </div>
        {openAddCartModal && (
          <ModalAddCart
            openAddCartModal={openAddCartModal}
            setOpenAddCartModal={setOpenAddCartModal}
            itemAddCart={products.find((item) => item.id === idProduct)}
          />
        )}

        <div className="product-list__pagination">
          <Row justify="center">
            <Col lg={5} md={6} sm={0} xs={0}></Col>
            <Col lg={19} md={18} sm={24} xs={24}>
              <Pagination
                onChange={(page, pageSize) => {
                  dispatch(
                    fetchProductList({
                      textSearch,
                      filter,
                      page: page,
                      limit: pageSize,
                    })
                  );
                }}
                current={Number(page)}
                total={Number(total)}
                pageSize={Number(limit)}
              />
            </Col>
          </Row>
        </div>
      </div>
    </MainLayout>
  );
}

export default Product;
