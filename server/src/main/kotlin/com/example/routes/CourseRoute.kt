import com.example.Controller.CourseController
import com.example.Controller.OrderController
import com.example.Controller.ProgramController
import com.example.Controller.UserController
import com.example.entity.AllDataEntity
import com.example.entity.Order
import com.example.entity.User
import io.ktor.server.application.*
import io.ktor.server.request.*
import io.ktor.server.response.*
import io.ktor.server.routing.*
import kotlinx.serialization.encodeToString
import kotlinx.serialization.json.Json
import org.jetbrains.exposed.dao.id.EntityID
import org.kodein.di.instance
import org.kodein.di.ktor.closestDI

// View
fun Route.courseRoute() {
    // course에 대한 작업은 이 controller가 전담(싱글톤 패턴 적용된 상태)
    val courseController by closestDI().instance<CourseController>()
    val orderController by closestDI().instance<OrderController>()
    val userController by closestDI().instance<UserController>()
    val programController by closestDI().instance<ProgramController>()

    get("/") {
        //call.respondRedirect("server")
    }

    route("server/searchCourse") {
        get {
            // 쎰네일과 함께 course 출력
            val allCourse = courseController.getAllwithThumbnail()

            call.respond(allCourse)
        }
    }
    route("server/searchCourse/{id}"){
        get {
            // 상세 설명과 함께 course 출력
            val id = call.parameters["id"]!!.toInt()
            val course = courseController.getAllwithThumbnail().find{it.id == id}
            val json = Json.encodeToString(course)
            println(json)
            call.respond(json)
        }
    }
    route("server/courseDetail/{id}") {
        get {
            // 상세 설명과 함께 course 출력
            val id = call.parameters["id"]!!.toInt()
            val courseDetail = courseController.getAllWtichProgram().find{it.id == id}
            val json = Json.encodeToString(courseDetail)
            println(json)
            call.respond(json)
        }
    }
    // program 찾아서 반환
    route("server/searchProgram/{id}"){
        get {
            val id = call.parameters["id"]!!.toInt()
            val program = programController.getAll().find{it.id == id}
            val json = Json.encodeToString(program)
            println(json)
            call.respond(json)
        }
    }
    route("server/searchUser/{id}"){
        get{
            val id = call.parameters["id"]!!.toInt()
            val user = userController.getAll().find{it.id == id}
            val json = Json.encodeToString(user)
            println(json)
            call.respond(json)
        }
    }
    // 구매내역 조회에 사용
    route("server/searchPurchase/{userName}/{phoneNumber}"){
        get{
            val userName = call.parameters["userName"]!!.toString()
            val phoneNumber = call.parameters["phoneNumber"]!!.toString()
            val user = userController.getAll().find{(it.name == userName) && (it.phone_number == phoneNumber)}
            val order = orderController.getAll().find{it.userId == user?.id.toString()}
            val json = Json.encodeToString(order)
            println(json)
            call.respond(json)
        }
    }

    // user 추가, order 추가 작업
    // user 추가 -> order 추가(personInfo 추가, 남은 좌석 감소)
    route("server/purchase") {
        post {
//            val order = call.receive<Order>()
//            val test = Order(order.id,
//                order.ordered_date,
//                order.up_date,
//                order.state,
//                order.QRcode,
//                order.total_price,
//                order.card_number,
//                order.personinfos
//            )
//
//            println("오더>>")
//            println(test)
//            //orderController.addOrder(test)
//
//            call.respond(test)
        }
    }
    // order에서 id로 검색
    route("server/purchase/{id}"){
        get{
            val id = call.parameters["id"]!!.toInt()
            val order = orderController.getAll().find{it.id.toInt() == id}
            val json = Json.encodeToString(order)

            println("get all order>>")
            println(json)

            call.respond(json)
        }
    }
    route("server/addUser") {
        post {
            val user = call.receive<User>()
            println("유저>>")
            println(user)
            //userController.addUser(user)
            call.respond(13)
        }
    }
    route("server/allData") {
        post {
            val all = call.receive<AllDataEntity>()
            println("all data>>>")
            println(all)

            // create user
            val user = User(
                all.id,
                all.name,
                all.phone_number,
            )
            println("유저>>")
            println(user)
            userController.addUser(user)

            // create order
            val order = Order(
                all.id.toString(),
                all.ordered_date,
                all.up_date,
                all.state,
                all.QRcode,
                all.total_price,
                all.card_number,
                all.personinfos,
                "",
                ""
            )
            println("오더>>")
            println(order)
            val orderid: EntityID<Int> = orderController.addOrder(order, all.programs.id, all.name).id
            val s = orderid.toString()
            val i = s.toInt()
            call.respond(i)
        }
    }
}