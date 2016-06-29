# DAS Store - Đồ án ứng dụng phân tán
## Nhóm
- 1312474 - Triệu Xuân Quý
- 1312485 - Nguyễn Ngọc Sáng
- 1312498 - Trần Thị Sương
- 1312508 - Nguyễn Đăng Thiện Tâm
## Mục lục
- [Giới thiệu](#Giới-thiệu)
- [Wireframe](#Wireframe)
- [Chức năng](#Chức-năng)
- [Data schema](#Data-schema)
- [Đánh giá cá nhân](#Đánh-giá-cá-nhân)
- [Video Walkthrough](#Video-Walkthrough)
## Giới thiệu
DAS Store là một website bán hàng nợi mọi tín đồ thời trang thỏa sức mua sắm với các sản phẩm mới nhất của các thương hiệu nổi tiếng trên toàn thế giới. Hãy cùng tham gia với chúng tôi, cùng trải nghiệm và thay đổi thời trang bản thân.

Website: [DAS Store](http://calm-shore-60970.herokuapp.com/)
## Wireframe
### Link
![Image of Link](https://s6.postimg.org/oe51csy2l/link.png)
### Login
![Image of Login](https://s6.postimg.org/kvt1gex6l/login.png)
### Home
![Image of Home](https://s6.postimg.org/5xamlzi4d/home.png)
### Order
![Image of Order](https://s6.postimg.org/lmqczxoxp/order.png)
### Service
![Image of Service](https://s6.postimg.org/mqahbw9kt/service.png)
### Store
![Image of Store](https://s6.postimg.org/cu9ec93st/store.png)
### Cart
![Image of Cart](https://s6.postimg.org/ate9doi9p/cart.png)
### Contact
![Image of Contact](https://s6.postimg.org/h8daacozh/contact.png)
## Chức năng
* [x] Đăng ký tài khoản bằng tên, email và mật khẩu.
* [x] Đăng nhập bằng tài khoản đăng ký, tài khoản facebook, tài khoản google.
* [x] Chỉnh sửa thông tin cá nhân.
* [x] Dùng filestack để upload và thay đổi ảnh đại diện.
* [x] Log out tài khoản.
* [x] Load danh sách các sản phẩm đặc biệt lên trang chủ.
* [x] Load danh sách các sản phẩm lên trang store.
* [x] Tìm kiếm sản phẩm theo tên gần đúng của sản phẩm.
* [x] Tìm kiếm sản phẩm theo size, color của sản phẩm.
* [x] Thiết kế responsive.
* [x] Sử dụng hiệu ứng aminitons.
* [x] Sử dụng Ajax.
* [x] Di chuyển lên đầu trang ở các trang web.
* [x] Thêm/xóa sản phẩm vào giỏ hàng, xem danh sách đặt hàng.
* [x] Comment đánh giá sản phẩm.
* [x] Đặt hàng.
* [x] Phòng chống cơ chế sql injection, cross-site- scripting.
* [x] Form validation bằng angularJS.
## Data schema
### Cart
Cart chứa dữ liệu của các sản phẩm khi người dùng thêm sản phẩm vào giỏ hàng. Dựa vào thông tin email của người dùng sau khi đăng nhập để lấy danh sách các sản phẩm đã chọn của người dùng đó trong giỏ hàng.
```Javascript
var cartSchema = mongoose.Schema({
	email: {type: String},
  cart:[{
    color : {type: String}, //màu sản phẩm
    imgUrl : {type: String}, //ảnh sản phẩm
    name : {type: String}, //tên sản phẩm
    number : {type: Number}, //số lượng sản phẩm
    price : {type: Number}, //giá sản phẩm
    size : {type: String} //size của sản phẩm
  }]
});
```
### Order
Lưu thông tin hóa đơn của khách hàng khi muốn đặt hàng.
```Javascript
var orderSchema = mongoose.Schema({ //
	id: {type: String}, //email người dùng
  item:[{ //mảng danh sách sản phẩm trong giỏ hàng
    color:{type: String},
    imgUrl:{type: String},
    name:{type: String},
    number:{type: Number},
    price:{type: Number},
    size:{type: String}
  }],
  receiver:{ //thông tin người nhận để giao hàng
    address: {type: String},
    email:{type: String},
    name:{type: String},
    phone:{type: String}
  }
});
```
### Products
Lưu thông tin sản phẩm.
```Javascript
var productSchema = mongoose.Schema({
	productID: {type: String, index: {unique: true, required: true}},
	basicInfo:{ //các thông tin chi tiết trong sản phẩm
		name: {type: String},
		imgUrl: {type: String},
		price: {type: Number},
		tag: {type: String},
		description: {type: String},
		listimgUrl: [{type: String}] //danh sách các ảnh nhỏ chi tiết của sản phẩm
	},
	color: [{type: String}],
	size: [{type: String}],
	featured:{type:Boolean}//đánh dấu sản phẩm nổi bật của website
});
```
### Review
Lưu thông tin comment đánh giá sản phẩm của khách hàng.
```Javascript
var reviewSchema = mongoose.Schema({
	productID: {type: String},
  comment:[{
    avatar:{type: String},
    content:{type: String}, //nội dung comment
    name:{type: String}, //tên người dùng
    rating:{type: Number} //số sao đánh giá của người dùng
  }]
});
```
### User
Lưu thông tin tài khoản của khách hàng.
```Javascript
var UserSchema = new Schema({
  userid: {type: String},
  token: {type: String},
  fullname: {type: String, required: true},
  email: {type: String, required: true},
  password: {type: String, default: null},
  avatar:{type: String},
});
```
## Đánh giá cá nhân
Mục | Nguyễn Ngọc Sáng | Trần Thị Sương | Triệu Xuân Quý | Ng.Đăng Thiện Tâm
--- | --- | --- | --- | ---
Hoạt động nhóm | - Sử dụng tốt github<br>-Sử dụng git theo mô hình Feature Branch Workflow | - Sử dụng tốt github<br>- Sử dụng git theo mô hình Feature Branch Workflow | - Sử dụng tốt github<br>- Sử dụng git theo mô hình Feature Branch Workflow | - Sử dụng tốt github<br>- Sử dụng git theo mô hình Feature Branch Workflow
Công nghệ | - Sử dụng và hiểu được AJAX<br>- So sánh được chỗ nào nên dùng AJAX và nên dùng Form | - Giải thích được lựa chọn xử lý tại client & server
Thiết kế | - Sử dụng tốt  thiết kế theo thẻ div<br>-Sử dụng các hiệu ứng hover, focus<br>- Biết sử dụng amination<br>- Thiết kế responsive<br>- Sử dụng tốt css và html | - Sử dụng tốt  thiết kế theo thẻ div<br>-Sử dụng các hiệu ứng hover, focus<br>- Biết sử dụng amination<br>- Thiết kế responsive<br>- Sử dụng tốt css và html | - Sử dụng tốt  thiết kế theo thẻ div<br>-Sử dụng các hiệu ứng hover, focus<br>- Biết sử dụng amination<br>- Thiết kế responsive<br>- Sử dụng tốt css và html | - Sử dụng tốt  thiết kế theo thẻ div<br>-Sử dụng các hiệu ứng hover, focus<br>- Biết sử dụng amination<br>- Thiết kế responsive<br>- Sử dụng tốt css và html
Lập trình font-end | - Sử dụng được javascript<br>- Sử dụng được jquery<br>- Sử dụng được AngularJS1 | - - Sử dụng được javascript | - Sử dụng được javascript | - Sử dụng được javascript
Lập trình & kiến trúc web | - Hiểu cơ chế và cách hoạt động của mô hình MVC<br>- Hiện thực và sử dụng mô hình MVC<br>- Thao tác tốt với MongoDB, thực hiện nhiều câu truy vấn phức tạp | - Hiểu cơ chế và cách hoạt động của mô hình MVC<br>- Hiện thực và sử dụng mô hình MVC<br>- Thao tác tốt với MongoDB, thực hiện nhiều câu truy vấn phức tạp | - Hiểu cơ chế và cách hoạt động của mô hình MVC<br>- Hiện thực và sử dụng mô hình MVC<br>- Thao tác tốt với MongoDB, thực hiện nhiều câu truy vấn phức tạp | - Hiểu cơ chế và cách hoạt động của mô hình MVC<br>- Hiện thực và sử dụng mô hình MVC
Ajax | - Hiểu cơ chế và cơ chế thực hiện của AJAX<br>- Lập trình sử dụng callback success, error<br>- Upload ảnh thông qua filestack | - Hiểu cơ chế và cơ chế thực hiện của AJAX | - Hiểu cơ chế và cơ chế thực hiện của AJAX
Bảo mật | - Hiểu cơ chế tấn công các loại như SQL injection và Cross-site Scripting<br>Phòng tránh được các cơ chế tấn công trên | - Hiểu cơ chế tấn công các loại như SQL injection và Cross-site Scripting<br>Phòng tránh được các cơ chế tấn công trên | - Hiểu cơ chế tấn công các loại như SQL injection và Cross-site Scripting<br>Phòng tránh được các cơ chế tấn công trên | - Hiểu cơ chế tấn công các loại như SQL injection và Cross-site Scripting<br>Phòng tránh được các cơ chế tấn công trên | - Hiểu cơ chế tấn công các loại như SQL injection và Cross-site Scripting<br>Phòng tránh được các cơ chế tấn công trên
API bên ngoài | - Sử dụng các API hỗ trợ như google map, facebook, google | - Sử dụng các API hỗ trợ như google map, facebook, google | - Sử dụng các API hỗ trợ như google map, facebook, google | - Sử dụng các API hỗ trợ như google map, facebook, google
Sử dụng frameworks | - Sử dụng tốt framework bootstrap<br>- AngularJS1 | - Sử dụng tốt framework bootstrap | - Sử dụng tốt framework bootstrap | - Sử dụng tốt framework bootstrap

Here's a walkthrough:

![Video Walkthrough](demo.gif)

GIF created with [LiceCap](http://www.cockos.com/licecap/).
## Licence
    Copyright [yyyy] [name of copyright owner]
    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at
        http://www.apache.org/licenses/LICENSE-2.0
    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.
