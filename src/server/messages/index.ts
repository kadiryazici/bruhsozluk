export const Msg = {
   app: {
      error: {
         msg: 'İstek gerçekleştirilirken öngörülemeyen bir hata oluştu.',
      },
   },

   auth: {
      error: {
         msg: 'Kullanıcı kimliği hatası.',
      },
   },

   add_header: {
      error: {
         nameNeeded: 'Başlık ismi gerekiyor.',
         headerExists: 'Bu başlık zaten var.',
      },
   },

   login: {
      error: {
         pleaseInputUsernameAndPasswordCorrectly:
            'Lütfen kullanıcı adı ve şifreyi doğru girin.',
         errorOccuredWhileLoggingIn: 'Giriş yapma kısmında bir hata oluştu.',
      },
   },

   signup: {
      error: {
         errorMessage: 'Lütfen kutucukları doğru doldurun.',
         errorUserAlreadyExists: 'Kullanıcı zaten bulunuyor.',
         errorOccuredWhileCreatingNewUser:
            'Kullanıcı oluştururken bir hata oluştu.',
         usernameShouldBeBetween3and20:
            'Kullanıcı adının uzunluğu 3 ila 20 karakter arasında olmalı.',
         passwordShouldBeBetween6and25:
            'Şifrenin uzunluğu 6 ila 20 karakter arasında olmalı.',
         username3_20AndPassword6_25:
            'KUllanıcı adı 3 ila 20, şifre 6 ila 25 karakter uzunluğunda olmalı.',
      },
      success: {
         userCreatedSuccessfully: 'Kullanıcı başarıyla oluşturuldu.',
      },
   },
};
