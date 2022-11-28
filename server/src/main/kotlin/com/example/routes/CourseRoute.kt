import com.example.Controller.CourseController
import com.example.Controller.OrderController
import com.example.Controller.ProgramController
import com.example.Controller.UserController
import com.example.entity.*
import io.ktor.http.*
import io.ktor.server.application.*
import io.ktor.server.request.*
import io.ktor.server.response.*
import io.ktor.server.routing.*
import kotlinx.serialization.Serializable
import kotlinx.serialization.encodeToString
import kotlinx.serialization.json.Json
import org.jetbrains.exposed.sql.transactions.transaction
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
            // course 정보 반환
            val allCourse = courseController.getAllwithThumbnail()

            call.respond(allCourse)
        }
    }
    route("server/searchCourse/{id}") {
        get {
            // order의 id로 찾은 course 정보 반환
            val id = call.parameters["id"]!!.toInt()
            val course = Json.encodeToString(
                courseController.getAllwithThumbnail().find { it.id == id }
            )

            call.respond(course)
        }
    }
    route("server/courseDetail/{id}") {
        get {
            // 상세 설명과 함께 course 반환
            val id = call.parameters["id"]!!.toInt()
            val courseDetail = Json.encodeToString(
                courseController.getAllWtichProgram().find { it.id == id }
            )

            call.respond(courseDetail)
        }
    }
    // program 찾아서 반환
    route("server/searchProgram/{id}") {
        get {
            val id = call.parameters["id"]!!.toInt()
            val program = programController.getAll().find { it.id == id }
            val json = Json.encodeToString(program)
            //println(json)
            call.respond(json)
        }
    }
    route("server/searchUser/{id}") {
        get {
            val id = call.parameters["id"]!!.toInt()
            val user = userController.getAll().find { it.id == id }
            val json = Json.encodeToString(user)
            //println(json)
            call.respond(json)
        }
    }
    // 구매내역 조회에 사용
    route("server/searchPurchase/{userName}/{phoneNumber}") {
        get {
            val userName = call.parameters["userName"]!!.toString()
            val phoneNumber = call.parameters["phoneNumber"]!!.toString()
            val user = userController.getAll().find { (it.name == userName) && (it.phone_number == phoneNumber) }

            var orderArr: Array<Order?>? = null
            if (user != null) {
                orderArr = orderController.getAll(user.id)
            }
            val result = Json.encodeToString(orderArr)

            call.respond(result)
        }
    }

    // user 추가, order 추가 작업
    // user 추가 -> order 추가(personInfo 추가, 남은 좌석 감소)
    route("server/purchase") {
        post p@{
            val purchase = call.receive<PurchaseInfo>();
            var program: Program? = null;
            transaction {
                val prog = ProgramEntity.findById(purchase.pid);
                program = prog?.getProgram() ?: null;
            }
            if (program == null) {
                call.respond(status = HttpStatusCode.BadRequest, message = "대응되는 프로그램이 존재하지 않음")
            }

            var totalCount = 0; // 전체 개수
            purchase.priceinfos.forEach { cur ->
                run {
                    totalCount += cur.count
                }
            }; // 개수 구하기

            // 남은 개수가 더 많으면 오류 상황
            if (totalCount > program!!.rem_count) {
                call.respond(status = HttpStatusCode.BadRequest, message = "주문 가능한 개수 초과")
            }
            var oid = 0;
            transaction {
                //개수 업데이트.
                val prog = ProgramEntity.findById(purchase.pid)!!;

                prog.rem_count -= totalCount;

                val course = prog.course;
                val priceinfos = course.priceinfos;

                var total_price = 0;

                val list = mutableListOf<Personinfo>()

                purchase.priceinfos.forEach { it ->
                    run {
                        val priceinfo = priceinfos.find { v -> v.type == it.type };
                        if (priceinfo != null) {
                            total_price += it.count * priceinfo.price;
                            val value = Personinfo(it.type, it.count, priceinfo.price)
                            list.add(value)
                        }
                    }
                }

                val user = userController.addUser(purchase.name, purchase.phone_number);

                val order = orderController.addOrder2(
                    total_price,
                    purchase.card_number,
                    prog,
                    user,
                    list
                );
                oid = order.id.value;
            }

            call.respond(status = HttpStatusCode.OK, oid);
        }
    }
// order에서 id로 검색
    route("server/purchase/{id}") {
        get {
            val id = call.parameters["id"]!!.toInt()
            val order = orderController.getAll().find { it.id.toInt() == id }
            val json = Json.encodeToString(order)

            //println("get all order>>")
            //println(json)

            call.respond(json)
        }
    }
//    route("server/addUser") {
//        post {
//            val user = call.receive<User>()
//            //println("유저>>")
//            //println(user)
//            //userController.addUser(user)
//            call.respond(13)
//        }
//    }
    // 전체/부분 환불 로직
    route("/server/{id}/refund") {
        post {
            @Serializable
            data class pData(val p1: Int, val p2: Int, val p3: Int)

            val data = call.receive<pData>()
            val id = call.parameters["id"]!!.toInt()
            val sum = data.p1 + data.p2 + data.p3
            val order = orderController.getAll().find{ it.id.toInt() == id }!!

            if(order.state == "expired") {
                call.respond("expired")
            }

            val size: Int? = order.personinfos.size
            var personCount: Int = 0

            for (i: Int in 0 until size!!){
                personCount += order.personinfos[i].count
            }

            // 전체 환불
            if(sum == personCount) {
                orderController.refundAll(order)
            }
            // 부분 환불
            else {
                val difference = personCount - sum
                orderController.refund(order, data.p1, data.p2, data.p3, difference)
            }

            call.respond("ok")
        }
    }
}