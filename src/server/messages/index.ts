class Messages {
   public app = {
      error: {
         msg: 'Bir hata oldu ama ne oldu bilmiyoruz.'
      }
   };

   public auth = {
      error: {
         msg: 'Giriş kimliği yanlış olabilir.'
      }
   };

   public add_entry = {
      error: {
         headerIdNeeded: `Başlık kimliği eşleşmiyor ki.`,
         missingData: 'Verileri doğru gönderir misiniz?',
         bodyNeeded: 'Neden entry içeriği girmediniz?',
         wrongHeaderId: `Başlık kimliği hatalı gibi.`,
         bodyShouldHaveAtLeastOneLetter: 'Hadi ama bir tane karakter gir bari.'
      },
      success: {
         createdHeader: 'Başlık oluşturuldu oleeey.'
      }
   };

   public add_header = {
      error: {
         nameNeeded: 'İsimsiz bir başlık açamazsın qoçum.',
         entryBodyNeeded: 'Entry içeriği girsek mi acaba?',
         headerExists: 'Aynı başlıktan üretemezsin.',
         anErrorOccured: 'Bir hata oldu ama ne oldu?'
      }
   };

   public delete_header = {
      error: {
         missingParameters: 'Eksik bilgi geldi.',
         headerDoesNotExist: 'Başlığı bulamadık.',
         headerIdNeeded: `Başlık kimliği gerekiyor.`
      },
      success: {
         msg: 'Başlık çöpe atıldı. '
      }
   };

   public delete_entry = {
      error: {
         wrongHeaderId: `Hatalı başlık kimliği.`,
         wrongEntryID: `Hatalı entry kimliği.`,
         missingParameters: 'Bazı parametreler eksik gibi.'
      },
      success: {
         msg: 'Entry çöpe fırlatıldı.'
      }
   };

   public login = {
      error: {
         pleaseInputUsernameAndPasswordCorrectly:
            'Kullanıcı adı veya şifreyi yanlış girmiş gibisin.',
         errorOccuredWhileLoggingIn:
            'Giriş yaparken bir hata oldu ama ne oldu bilmiyoruz.'
      }
   };

   public signup = {
      error: {
         errorMessage: 'Kutucuklara yeterli metin mi girsek?.',
         errorUserAlreadyExists: 'Bu kullanıcı adı zaten var ki.',
         errorOccuredWhileCreatingNewUser:
            'Kayıt olurken bir hata oldu ama ne oldu bilmiyoruz.',
         usernameShouldBeBetween3and20:
            'Kullanıcı adının uzunluğu 3 ila 20 karakter arasında olmalı.',
         passwordShouldBeBetween6and25:
            'Şifrenin uzunluğu 6 ila 20 karakter arasında olmalı.',
         username3_20AndPassword6_25:
            'Kullanıcı adı 3 ila 20, şifre 6 ila 25 karakter uzunluğunda olmalı.'
      },
      success: {
         userCreatedSuccessfully: 'Kullanıcı başarıyla oluşturuldu.'
      }
   };

   public get_header = {
      error: {
         wrongHeaderID: `Başlık ID'si eşleşmiyor`,
         neededParams: 'Gerekli parametreler eksik.'
      }
   };

   public get_entry = {
      error: {
         missingParameters: 'Gerekli parametreler eksik.',
         headerIdDoesNotMatch: `Başlık kimliği eşleşmiyor.`,
         entryIdDoesNotMatch: `Entry kimliği eşleşmiyor.`
      }
   };

   public get_verification = {
      error: {
         msg: 'Yanlış kullanıcı kimliği ya da bir hata oluştu.'
      },
      success: {
         msg: 'Doğru kullanıcı kimliği.'
      }
   };

   public post_likeEntry = {
      error: {
         msg: 'Gereken bilgilerde yanlışlık var.',
         wrongHeaderID: 'Başlık kimliği eşleşmiyor.',
         wrongEntryID: 'Entry kimliği eşleşmiyor.',
         cannotLikeAgain: 'Bir entry tekrardan beğenilemez!'
      },
      success: {
         msg: 'Ayy Şimdi bunu beğendim mi ben?'
      }
   };

   public post_unlikeEntry = {
      error: {
         msg: 'Bir hata oldu ya da nefretini dağlara yazmak istiyorsun.'
      },
      success: {
         msg: 'Hıh sevmemiştim zaten!'
      }
   };

   public get_liked_entries_by_user = {
      error: {
         missingParams: 'Bazı parametreler eksik.',
         userNotFound: `Bu kişiyi bulamadık tüh.`
      }
   };

   public post_verify_header = {
      error: {
         cannotCreate: 'Bu başlığı açamayız.',
         alreadyExists: 'Bu başlık zaten var.',
         missingParameters: 'Bazı parametreler eksik'
      },
      success: {
         msg: 'Bu başlık açılabilir.'
      }
   };

   public left_content = {
      error: {
         headerNotFound: 'Başlık Bulunamadı.'
      },
      success: 'Başlık sol kısma eklendi.'
   };

   public Likes = {
      error: {
         missingParameteres: 'Bazı parametreler eksik.'
      }
   };

   public GetUser = {
      error: {
         missingParameters: 'Bazı parametreler eksik.',
         userNotFound: 'Kullanıcı bulunamadı'
      }
   };
}

export const Msg = new Messages();
