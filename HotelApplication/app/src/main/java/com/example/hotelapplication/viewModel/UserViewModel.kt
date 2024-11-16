package com.example.hotelapplication.viewModel

import androidx.lifecycle.ViewModel
import com.example.hotelbuisnesslayer.UserRepository
import com.example.hotelbuisnesslayer.Util.IResults
import com.example.hoteldatalayer.Dto.UserDto
import dagger.hilt.android.lifecycle.HiltViewModel
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.asStateFlow

@HiltViewModel
class UserViewModel(private  val userRepository: UserRepository):ViewModel() {

    private var _userData = MutableStateFlow<UserDto?>(null)
    var user = _userData.asStateFlow()

    private  var _errorMessage = MutableStateFlow<String?>(null)

    suspend fun getUserDataById(userID:Int=0){
        when(val data=userRepository.getUserByID(userID)){
           is IResults.Secessfull->{
            _userData.emit(data.dataResult)
           }
            is IResults.Error->{
               _errorMessage.emit(data.dataResult.toString())
            }
            else->{

            }
        }
    }
}