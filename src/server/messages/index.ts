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
      },
      success: {
         userCreatedSuccessfully: 'Kullanıcı başarıyla oluşturuldu.',
      },
   },
};
