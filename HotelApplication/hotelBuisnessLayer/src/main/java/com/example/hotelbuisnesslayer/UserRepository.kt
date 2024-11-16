package com.example.hotelbuisnesslayer

import com.example.hotelbuisnesslayer.Util.IResults
import com.example.hotelbuisnesslayer.Util.enNetworkError
import com.example.hoteldatalayer.Dto.UserDto
import com.example.hoteldatalayer.Network.obNetworkInstance

class UserRepository(private val userData: obNetworkInstance) {

    suspend fun getUserByID(id: Int): IResults<UserDto?, enNetworkError> {
        //    val request = userData.userNetworkHolder.getUserDataByID(id)
        val request = userData.userNetworkHolder.getUserDataByID(id=id)
            val result =  when (request.isSuccessful) {
                true ->  IResults.Secessfull(request.body())
                else ->  when (request.code()) {
                        404 -> IResults.Error(enNetworkError.NOTFOUND)
                    400 -> IResults.Error(enNetworkError.PADREQUEST)
                    408 -> IResults.Error(enNetworkError.TIMESOUT)
                    else->{
                        println("\n\nthis the error from get user by id ${request.errorBody()}\n\n")

                        IResults.Error(enNetworkError.UNNOWNeERROR)}
                }
            }
            return result
    }
}