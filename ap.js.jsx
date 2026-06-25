import { useState } from "react";

const CHAPTERS = [
  { id: 1, title: "Baxt tuzog'i", en: "The Happiness Trap", idea: "Baxtni majburlab quvish — odamni tuzoqqa tushiradi. Haqiqiy baxt mazmunli hayot va qadriyatlar asosida yashash.", mistakes: ["\"Baxtli bo'lishim kerak\" degan e'tiqod — bosim yaratadi.", "Salbiy fikrlarni yo'qotishga urinish — ular kuchayadi.", "Hissiyotlardan qochish — stressni ko'paytiradi.", "Baxtni majburlab ushlash — kapalakni stolga mixlashdek."], exercises: ["Kurash tugmasini o'chiring: salbiy fikr kelganda uni qabul qiling.", "Fikrni yozing va yoniga: \"Bu faqat fikr, haqiqat emas\" deb qo'shing.", "Uchta narsani nomlang: ko'rayotganingiz, eshitayotganingiz, sezayotganingiz."], conclusion: "Baxtni majburlab quvish — tuzoq. Ularni qabul qilish va hozirgi lahzaga qaytish muhim." },
  { id: 2, title: "Yomon aylanishlar", en: "Vicious Cycles", idea: "Salbiy his-tuyg'ulardan qochish yomon aylanish hosil qiladi: qochish → yengillik → kuchliroq tashvish → yana qochish.", mistakes: ["Salbiy fikrlarni bostirish — ular kuchayadi.", "Hissiyotlardan qochish — uzoq muddatda tashvish oshadi.", "Perfektsionizm — doim baxtli bo'lish bosimi.", "O'zini ayblash — \"men baxtsizman, demak men yomonman\"."], exercises: ["Yomon aylanishni chizib ko'ring: qochish → yengillik → tashvish → yana qochish.", "Salbiy fikrni yozing: \"Men hozir tashvishlanyapman.\"", "Atrofingizdagi uchta narsani ko'ring, eshiting, sezib ko'ring."], conclusion: "Salbiy fikrlardan qochish — yomon aylanish. Fikrlarni kuzatish, qabul qilish muhim." },
  { id: 3, title: "O'ylovchi \"Men\"", en: "The Thinking Self", idea: "Fikrlar — bu faqat so'zlar va tasvirlar, ular bizni boshqarishi shart emas.", mistakes: ["Fikrlarni haqiqat deb qabul qilish.", "Fikrlar bilan kurashish — ular kuchayadi.", "O'zini fikrlar bilan tenglashtirish."], exercises: ["Fikrni nomlang: \"Bu faqat fikr, haqiqat emas.\"", "Fikrni bulutga yozib, osmonda suzib ketayotganini tasavvur qiling.", "O'ylovchi Men va Kuzatuvchi Men'ni ajrating.", "Salbiy fikrni kulgili ovozda takrorlang."], conclusion: "Fikrlar haqiqat emas. O'ylovchi va Kuzatuvchi Men'ni ajratish orqali fikrlarni yengil tutamiz." },
  { id: 4, title: "Kuzatuvchi \"Men\"", en: "The Observing Self", idea: "Kuzatuvchi Men — ichki barqarorlik manbai. U fikrlar, his-tuyg'ular va voqealarni kuzatadi, lekin ulardan mustaqil.", mistakes: ["O'zini fikrlar bilan tenglashtirish.", "Hissiyotlarga berilish — tashvishni o'zini belgilovchi sifatida ko'rish.", "Kuzatuvchi Men'ni unutish."], exercises: ["Ko'zingizni yumib fikrlarni kuzating: \"Men fikr emasman, men kuzatuvchiman.\"", "Tashvish kelganda nomlang: \"Men bu tashvishni kuzatyapman.\"", "Kundalikda: \"O'ylovchi Men nima deyapti?\" va \"Kuzatuvchi Men qanday ko'ryapti?\""], conclusion: "Kuzatuvchi Men bilan bog'lanish — ruhiy barqarorlik va erkinlik manbai." },
  { id: 5, title: "Kurash tugmasi", en: "The Struggle Switch", idea: "Salbiy fikr kelganda uni yo'qotishga urinish — kurash tugmasini yoqish. Tugmani o'chirish — qabul qilish.", mistakes: ["Salbiy his-tuyg'uni yo'qotishga urinish — kuchaytiradi.", "\"Men tashvishlanyapman, demak zaifman.\"", "Kurashni davom ettirish — energiyani tugatadi."], exercises: ["Kundalikda yozing: \"Men qachon kurash tugmasini yoqaman?\"", "Ayting: \"Bu his-tuyg'u hozir shu yerda, men uni qabul qilaman.\"", "5 daqiqa nafasni kuzating, fikr chalg'isa qaytib keling."], conclusion: "Salbiy his-tuyg'ulardan qochish kurash tugmasini yoqadi. Tugmani o'chirish — qabul qilish." },
  { id: 6, title: "Nazorat illyuziyasi", en: "The Illusion of Control", idea: "Fikrlar va his-tuyg'ularni to'liq nazorat qila olmaymiz. Haqiqiy erkinlik — nazoratni qo'yib yuborishda.", mistakes: ["\"Men salbiy fikrlarni yo'qotishim kerak\" — bosim.", "Hissiyotlarni bostirish — ular qayta paydo bo'ladi.", "Nazoratni majburlash — tashvishni oshiradi."], exercises: ["Nazorat qila oladigan va olmaydigan narsalar ro'yxatini tuzing.", "Ayting: \"Men bu fikrni nazorat qila olmayman, lekin qabul qila olaman.\"", "Uchta narsani ko'ring, eshiting, sezib ko'ring."], conclusion: "Nazorat qilish — illyuziya. Haqiqiy erkinlik qabul qilishda." },
  { id: 7, title: "Reallik bo'shlig'i", en: "The Reality Gap", idea: "\"Hayot shunday bo'lishi kerak\" degan tasavvur bilan haqiqat o'rtasidagi tafovut azob beradi.", mistakes: ["Ideal hayot tasavvuri — \"doim baxtli bo'lishim kerak.\"", "Haqiqatni rad etish — og'riqni qabul qilmaslik.", "O'zini ayblash — \"hayotim mukammal emas, demak men yomonman.\""], exercises: ["\"Bo'lishi kerak\" ro'yxati va yoniga haqiqat qanday ekanini yozing.", "Ayting: \"Hayot hozir shunday, men uni qabul qilaman.\"", "Har kuni uchta narsani yozing: \"Nimaga minnatdorman?\""], conclusion: "Haqiqatni qabul qilish va minnatdorlik — reallik bo'shlig'ini kamaytiradi." },
  { id: 8, title: "Baxt haqidagi afsona", en: "The Happiness Myth", idea: "\"Doimiy ravishda yaxshi his qilish\" — bu afsona. Haqiqiy baxt mazmunli hayot.", mistakes: ["Doimiy baxtni kutish.", "Salbiy his-tuyg'ulardan qochish.", "O'zini boshqalar bilan solishtirish.", "Mukammal hayot = doimiy baxt afsonasi."], exercises: ["\"Men baxtni qanday tasavvur qilaman? Bu haqiqatmi?\" deb yozing.", "Har kuni his-tuyg'ularni qabul qiling: \"Bu his-tuyg'u normal.\"", "Qadriyatlaringizga mos kichik harakat qiling."], conclusion: "Baxt haqidagi afsona noto'g'ri. Haqiqiy baxt — qadriyatlar asosida mazmunli hayot." },
  { id: 9, title: "Qayiqdagi jinlar", en: "Demons on the Boat", idea: "Hayot — qayiqda sayohat. Jinlar — salbiy fikrlar. Ularni qabul qilib, qayiqni qadriyatlar yo'nalishida harakatlantirish.", mistakes: ["Jinlar bilan kurashish — ular kuchayadi.", "Qayiqni to'xtatish — hayot harakatlanmaydi.", "O'zini jinlar bilan tenglashtirish."], exercises: ["\"Mening jinlarim kimlar?\" deb yozing.", "Ayting: \"Bu fikrlar qayiqimda bor, lekin men ularni qabul qilaman.\"", "\"Mening qadriyatlarim nima?\" so'rang va har kuni kichik qadam tashlang."], conclusion: "Jinlarni qabul qilib, qadriyatlar yo'nalishida harakat qilish — hayotni mazmunli qiladi." },
  { id: 10, title: "Fikrlar bilan kurash", en: "The Struggle with Thoughts", idea: "Fikrlar bilan kurashish ularni kuchaytiradi. ACT: fikrlarni qabul qilish va yengil tutish.", mistakes: ["Fikrlarni haqiqat deb qabul qilish.", "Fikrlarni bostirish — ular kuchayadi.", "Fikrlar bilan kurashish — energiyani tugatadi.", "O'zini fikrlar bilan tenglashtirish."], exercises: ["Salbiy fikrni yozing: \"Bu faqat fikr, haqiqat emas.\"", "Fikrni bulutga yozib, osmonda suzayotganini tasavvur qiling.", "Salbiy fikrni kulgili ovozda takrorlang.", "Ayting: \"Men fikr emasman, men kuzatuvchiman.\""], conclusion: "Fikrlar bilan kurashish ularni kuchaytiradi. Qabul qilish va yengil tutish — erkinlik." },
  { id: 11, title: "Mindfulness", en: "Mindfulness", idea: "Ongni hozirgi lahzaga qaytarish, uni to'liq his qilish va qabul qilish — tashvishni kamaytiradi.", mistakes: ["O'tmishda qolish — xato qildim fikrida yashash.", "Kelajak tashvishida yashash.", "Hozirgi lahzani yo'qotish.", "Mindfulnessni mukammal qilishga urinish."], exercises: ["5 daqiqa nafasni kuzating.", "Tanangizni boshdan oyoqqa skanerlang.", "Uchta narsani nomlang: ko'rish, eshitish, sezish.", "Har kuni 3 ta minnatdorlik yozing."], conclusion: "Mindfulness — ongni hozirgi lahzaga qaytarish. O'tmish va kelajak tashvishidan ozod bo'lish." },
  { id: 12, title: "Kengayish", en: "Expansion", idea: "Salbiy his-tuyg'ularga joy berish, ularni tanada his qilish va kengaytirish — kurashni kamaytiradi.", mistakes: ["Hissiyotlardan qochish — og'riqni kuchaytiradi.", "\"Tashvishlanyapman, demak zaifman.\"", "Hissiyotlarni tanada bloklash."], exercises: ["Tashvish kelganda tanada qayerda his qilayotganingizni aniqlang va joy bering.", "Nafas olayotganda kengaytirib, chiqarayotganda yengil kuzating.", "\"Men hozir nimani his qilyapman? Bu normal, joy beraman.\""], conclusion: "Salbiy his-tuyg'ularga joy berish — ichki barqarorlikni oshiradi." },
  { id: 13, title: "Amalda kengayish", en: "Expansion in Practice", idea: "Kengayishni kundalik hayotda qo'llash — og'riqni yo'qotish emas, uni yengil tutish va u bilan birga yashash.", mistakes: ["Hissiyotlarni bostirish.", "Og'riqni yo'qotishga urinish.", "Kengayishni noto'g'ri tushunish — og'riqni yo'qotish kerak deb o'ylash.", "O'zini ayblash."], exercises: ["Ko'zingizni yumib, hissiyotga joy bering: \"Men bu hissiyotga joy beraman.\"", "Nafas bilan kengaytiring va yengil kuzating.", "\"Hozir nimani his qilyapman? Bu normal, joy beraman.\"", "Og'riq kelganda kuzating va joy bering."], conclusion: "Kengayish — salbiy his-tuyg'ularga joy berish va yengil tutish." },
  { id: 14, title: "Defuziya", en: "Defusion", idea: "Fikrlarni ongdan ajratish, ularni faqat so'z sifatida ko'rish — boshqarishni to'xtatadi.", mistakes: ["Fikrlarni haqiqat deb qabul qilish.", "Fikrlar bilan kurashish.", "O'zini fikrlar bilan tenglashtirish.", "Defusionni noto'g'ri tushunish — fikrlarni yo'qotish kerak deb o'ylash."], exercises: ["\"Bu faqat fikr, haqiqat emas.\"", "Fikrni bulutda tasavvur qiling.", "Fikrni kulgili ovozda takrorlang.", "\"Men fikr emasman, men kuzatuvchiman.\"", "Fikrni yozib, \"Bu faqat so'zlar\" deng."], conclusion: "Defuziya — fikrlarni ongdan ajratish, yengil tutish. Ichki erkinlikni oshiradi." },
  { id: 15, title: "Qadriyatlar", en: "Values", idea: "Qadriyatlar — hayotga mazmun beruvchi yo'nalishlar. Ular maqsad emas, doimiy kompas.", mistakes: ["Qadriyatlarni maqsad bilan adashtirish.", "Qadriyatlarni unutish.", "Tashqi bosimdan qadriyat tanlash.", "Qadriyatlarni faqat fikr darajasida qoldirish."], exercises: ["\"Menga hayotda eng muhim narsa nima?\" ro'yxat tuzing.", "Qadriyatlarni ustuvor qiling: eng muhimidan kamroqqa.", "Har kuni qadriyatga mos kichik harakat qiling.", "Qadriyat va maqsadni ajrating."], conclusion: "Qadriyatlar — hayotga mazmun beruvchi yo'nalishlar. Salbiy fikrlarga qaramay yo'l ko'rsatadi." },
  { id: 16, title: "Qat'iy harakat", en: "Committed Action", idea: "Haqiqiy erkinlik — qadriyatlar asosida qat'iy harakat. Bu mukammallik emas, doimiy intilish.", mistakes: ["Mukammallikni kutish.", "Qadriyatlarni unutish.", "Qadriyatlarni faqat fikr darajasida qoldirish.", "Qiyinchiliklardan qochish."], exercises: ["Har bir qadriyat uchun kichik harakat rejasini yozing.", "Har kuni qadriyat asosida kichik qadam tashlang.", "\"Menga qadriyatlar asosida harakat qilishga nima to'sqinlik qilmoqda?\"", "Har bir muhim qarorda: \"Bu qadriyatlarimga mosmi?\""], conclusion: "Haqiqiy erkinlik — qadriyatlar asosida qat'iy harakat. Mukammallik emas, doimiy intilish." },
  { id: 17, title: "Maqsadlar va qadriyatlar", en: "Goals vs. Values", idea: "Qadriyatlar — yo'nalish, maqsadlar — natija. Qadriyatlar tugamaydi, maqsadlar tugaydi.", mistakes: ["Qadriyatlarni maqsad bilan adashtirish.", "Maqsadga yetgach qadriyatni unutish.", "Maqsadni mukammallik sifatida ko'rish.", "Maqsadni qadriyatdan ajratib qo'yish."], exercises: ["Qadriyat va maqsad ro'yxatini ajrating.", "Har bir maqsadning qaysi qadriyatga mos ekanini yozing.", "Qadriyatga mos yangi maqsad qo'ying.", "Maqsadga yetgach: \"Endi bu qadriyatni qanday davom ettiraman?\""], conclusion: "Qadriyatlar yo'nalish, maqsadlar natija. Qadriyat asosida maqsad qo'yish — mazmunli hayot." },
  { id: 18, title: "Tanlov nuqtasi", en: "The Choice Point", idea: "Har bir lahza tanlov nuqtasi: salbiy fikrlarga ergashish yoki qadriyatlar asosida harakat qilish.", mistakes: ["Avtomatik reaktsiya.", "Qadriyatlarni unutish.", "Tanlovni kechiktirish.", "O'zini ayblash."], exercises: ["Har kuni: \"Men hozir tanlov nuqtasida turibmanmi?\"", "Tanlov nuqtasida: \"Bu qaror qadriyatlarimga mosmi?\"", "Salbiy fikr kelganda 5 soniya kuting, keyin qaror qabul qiling.", "\"Bugun men tanlov nuqtasida qanday qaror qildim?\""], conclusion: "Har bir lahza tanlov nuqtasi. Qadriyatlar asosida tanlov — mazmunli hayotning kaliti." },
  { id: 19, title: "Umrboqiy sayohat", en: "The Journey of a Lifetime", idea: "Hayot — bir martalik sayohat. Og'riqdan qochish emas, qadriyatlar asosida mazmunli yo'l yurish.", mistakes: ["Hayot mukammal bo'lishi kerak deb o'ylash.", "Og'riqdan qochish.", "Qadriyatlarni unutish.", "Sayohatni faqat maqsad sifatida ko'rish."], exercises: ["Hayotni uzun yo'l sifatida tasavvur qiling, qadriyatlarni aniqlang.", "Og'riq kelganda: \"Bu sayohatimning bir qismi.\"", "Qadriyatlar xaritasini chizing.", "Har kuni: \"Sayohatimda qadriyatlarimga mos qadam tashladimmi?\""], conclusion: "Hayot — umrboqiy sayohat. Og'riq yo'lning bir qismi, qadriyatlar asosida yurish muhim." },
  { id: 20, title: "Mazmunli hayot", en: "Living a Vital Life", idea: "Mazmunli hayot — doimiy baxt emas, qadriyatlar yo'nalishida harakat. Ongli tanlov va hozirgi lahzani his qilish.", mistakes: ["Baxtni asosiy maqsad qilish.", "Og'riqdan qochish.", "Qadriyatlarni unutish.", "Mukammallikni kutish."], exercises: ["Har kuni: \"Bugun mazmunli hayot uchun qanday harakat qildim?\"", "Og'riq kelganda: \"Bu mazmunli hayotimning bir qismi.\"", "Har bir muhim qarorda qadriyatlarni tekshiring.", "5 daqiqa nafasni kuzating."], conclusion: "Mazmunli hayot — qadriyatlar asosida, og'riqni qabul qilib, hozirgi lahzani his qilish." },
  { id: 21, title: "Doimiy amaliyot", en: "The Ongoing Practice", idea: "ACT bir martalik mashq emas, doimiy amaliyot. Fikrlar qaytib keladi — ularga joy berish va qadriyatlar asosida harakat qilish.", mistakes: ["Bir martalik mashq sifatida ko'rish.", "Mukammallikni kutish.", "Mashqlarni unutish.", "Qadriyatlarni esdan chiqarish."], exercises: ["Har kuni 5 daqiqa nafas kuzatish.", "Salbiy fikr kelganda: \"Bu faqat fikr.\"", "Har kuni qadriyat kundaligi.", "Doimiy amaliyot haftalik rejasini tuzing."], conclusion: "ACT mashqlari doimiy amaliyot. Kundalik hayotga singdirish — mazmunli hayotning kaliti." },
  { id: 22, title: "Og'riqning haqiqati", en: "The Reality of Pain", idea: "Hayotda og'riq muqarrar. Uni yo'qotishga urinish emas, qabul qilish va unga joy berish.", mistakes: ["Og'riqni yo'qotishga urinish.", "Og'riqdan qochish.", "Og'riqni zaiflik sifatida ko'rish.", "Og'riqni qadriyatlardan ajratish."], exercises: ["Og'riq kelganda: \"Men hozir og'riqni his qilyapman.\"", "Og'riqni tanada qayerda his qilayotganingizni aniqlang, joy bering.", "Og'riqni bulut sifatida tasavvur qiling.", "Og'riq kelganda: \"Men qadriyatlarimga mos qanday harakat qila olaman?\""], conclusion: "Og'riq hayotning tabiiy qismi. Qabul qilish — ichki erkinlikni oshiradi." },
  { id: 23, title: "Nazorat bilan kurash", en: "The Struggle with Control", idea: "Hayotni to'liq nazorat qilishga urinish kurashni kuchaytiradi. Qabul qilish va qadriyatlar asosida harakat.", mistakes: ["Fikr va hissiyotlarni nazorat qilishga urinish.", "Hammasi qo'limda bo'lishi kerak degan bosim.", "Nazoratni yo'qotishdan qo'rquv.", "Qadriyatlarni unutish."], exercises: ["Nazorat qilish va qila olmaslik ro'yxati.", "\"Men bu fikrni nazorat qila olmayman, lekin qabul qila olaman.\"", "Nazorat qila olmaslikda: \"Qadriyatlarimga mos qanday harakat qila olaman?\"", "Nazoratni qo'lingizda ip sifatida tasavvur qilib, asta qo'yib yuboring."], conclusion: "Nazorat qilish — kurashni kuchaytiradi. Nazoratni qo'yib yuborish — ichki erkinlik." },
  { id: 24, title: "Kurashni qo'yib yuborish", en: "Letting Go of the Struggle", idea: "Ichki kurashni to'xtatib, og'riq va hissiyotlarga joy berish, qadriyatlar asosida harakat qilish — haqiqiy erkinlik.", mistakes: ["Kurashni kuchaytirish.", "Og'riqdan qochish.", "Kurashni qo'yib yuborishni zaiflik deb ko'rish.", "Qadriyatlarni unutish."], exercises: ["\"Men hozir nimaga qarshi kurashyapman?\"", "\"Men bu kurashni qo'yib yuboraman.\"", "Og'riqqa joy bering.", "Kurashni to'xtatgach: \"Qadriyatlarimga mos qanday harakat qila olaman?\""], conclusion: "Kurashni qo'yib yuborish — ichki erkinlikning kaliti." },
  { id: 25, title: "Qabul qilish va qat'iy harakat", en: "Acceptance and Commitment", idea: "ACTning markaziy nuqtasi — qabul qilish (og'riqqa joy berish) va qat'iy harakat (qadriyatlar asosida).", mistakes: ["Qabul qilishni noto'g'ri tushunish — og'riqni yoqtirish.", "Qat'iy harakatni mukammallik sifatida ko'rish.", "Qabul qilishni passivlik deb o'ylash.", "Qadriyatlarni unutish."], exercises: ["Og'riq kelganda: \"Men bu og'riqqa joy beraman.\"", "Har kuni qadriyatlar asosida kichik qadam.", "\"Men bu og'riqni qabul qilib, qadriyatlarimga mos qanday harakat qila olaman?\"", "\"Bugun nimani qabul qildim? Qadriyatlarimga mos qanday harakat qildim?\""], conclusion: "Qabul qilish + qat'iy harakat — hayotni mazmunli va barqaror qiladi." },
  { id: 26, title: "Baxt illyuziyasi", en: "The Illusion of Happiness", idea: "Doimiy baxt — illyuziya. Haqiqiy baxt — qadriyatlar asosida mazmunli hayot kechirish jarayoni.", mistakes: ["Doimiy baxtni kutish.", "Baxtni tashqi narsalardan izlash.", "Og'riqni baxtga zid deb ko'rish.", "Baxtni maqsad sifatida ko'rish."], exercises: ["\"Men baxt haqida qanday afsonalarga ishonaman?\"", "\"Qadriyatlarimga mos yashash men uchun baxt nimani anglatadi?\"", "Og'riq kelganda: \"Bu mazmunli hayotimning bir qismi.\"", "\"Bugun qadriyatlarimga mos qanday harakat qildim?\""], conclusion: "Doimiy baxt illyuziya. Haqiqiy baxt — qadriyatlar asosida mazmunli jarayonda." },
  { id: 27, title: "Qochish tuzog'i", en: "The Trap of Avoidance", idea: "Qochish vaqtincha yengillik beradi, lekin muammoni kuchaytiradi. Haqiqiy erkinlik — qochishdan chiqib, qadriyatlar asosida.", mistakes: ["Og'riqdan qochish.", "Qochishni yechim sifatida ko'rish.", "Qadriyatlarni unutish.", "Qochishni odatiy deb bilish."], exercises: ["\"Men nimadan qochyapman?\"", "Og'riq kelganda: \"Men bu og'riqqa joy beraman.\"", "Qochish istagi kelganda: \"Qadriyatlarimga mos qanday harakat qila olaman?\"", "\"Bugun nimadan qochdim? Qadriyatlarimga mos qanday harakat qildim?\""], conclusion: "Qochish muammoni kuchaytiradi. Qochish tuzog'idan chiqib, qadriyatlar asosida harakat qilish — erkinlik." },
  { id: 28, title: "Hayotga ochilish", en: "Opening Up to Life", idea: "Haqiqiy erkinlik — hayotga ochilish: og'riqni qabul qilish, quvonchni his qilish va qadriyatlar asosida yashash.", mistakes: ["Hayotdan yopilish.", "Faqat quvonchni qabul qilish.", "Og'riqni baxtga zid deb ko'rish.", "Qadriyatlarni unutish."], exercises: ["\"Men bugun qanday hissiyotlarni qabul qildim?\"", "Og'riq kelganda tanada qayerda his qilayotganingizni aniqlang, joy bering.", "Quvonch kelganda uni to'liq his qiling.", "\"Bugun qadriyatlarimga mos qanday harakat qildim?\""], conclusion: "Hayotga ochilish — og'riqni qabul qilish, quvonchni his qilish, qadriyatlar asosida yashash." },
  { id: 29, title: "Qo'rquvga yuzlanish", en: "Facing Fear", idea: "Qo'rquvdan qochish emas, unga yuzlanish va qadriyatlar asosida harakat — haqiqiy erkinlik.", mistakes: ["Qo'rquvdan qochish.", "Qo'rquvni zaiflik sifatida ko'rish.", "Qo'rquvni qadriyatlardan ajratish.", "Qo'rquvni nazorat qilishga urinish."], exercises: ["\"Men hozir qo'rqyapman.\"", "Qo'rquvni tanada qayerda his qilayotganingizni aniqlang, joy bering.", "\"Men qadriyatlarimga mos qanday harakat qila olaman?\"", "\"Bugun nimadan qo'rqdim? Qo'rquvga qaramay qanday harakat qildim?\""], conclusion: "Qo'rquv — tabiiy tajriba. Uni qabul qilib, qadriyatlar asosida harakat qilish — mazmunli hayot." },
  { id: 30, title: "Qabul qilish orqali erkinlik", en: "Freedom Through Acceptance", idea: "Haqiqiy erkinlik — nazorat qilish emas, qabul qilish. Ichki munosabatdan kelib chiqadi.", mistakes: ["Qabul qilishni passivlik sifatida ko'rish.", "Qabul qilishni og'riqni yoqtirish deb o'ylash.", "Nazoratni davom ettirish.", "Qadriyatlarni unutish."], exercises: ["Og'riq kelganda: \"Men bu og'riqqa joy beraman.\"", "Salbiy fikrni bulutda tasavvur qiling.", "Qabul qilishdan so'ng: \"Qadriyatlarimga mos qanday harakat qila olaman?\"", "\"Bugun nimani qabul qildim? Qadriyatlarimga mos qanday harakat qildim?\""], conclusion: "Haqiqiy erkinlik — qabul qilish orqali keladi. Ichki kurashni to'xtatib qadriyatlar asosida harakat." },
  { id: 31, title: "Tayyorlik kuchi", en: "The Power of Willingness", idea: "Tayyorlik — og'riq va qo'rquvlarga qarshi kurashni to'xtatib, ularga joy berish. Bu kuch va donolik.", mistakes: ["Tayyorlikni zaiflik sifatida ko'rish.", "Tayyorlikni passivlik deb o'ylash.", "Og'riqni yo'qotishga urinish.", "Qadriyatlarni unutish."], exercises: ["Og'riq kelganda: \"Men bu og'riqqa tayyorman.\"", "Qo'rquv kelganda: \"Men bu qo'rquvni his qilishga tayyorman.\"", "\"Qadriyatlarimga mos qanday harakat qila olaman?\"", "\"Bugun nimaga tayyor bo'ldim? Qadriyatlarimga mos qanday harakat qildim?\""], conclusion: "Tayyorlik — ichki erkinlikning kaliti. Og'riq va qo'rquvni qabul qilish kuch." },
  { id: 32, title: "Bo'lishga jur'at", en: "The Courage to Be", idea: "Haqiqiy erkinlik — o'zini bo'lishga jur'at. Qo'rquvga qaramay qadriyatlar asosida yashash.", mistakes: ["Jur'atni qo'rquv yo'qligi deb o'ylash.", "Jur'atni mukammallik sifatida ko'rish.", "Jur'atni tashqi ko'rinish bilan bog'lash.", "Qadriyatlarni unutish."], exercises: ["Qo'rquv kelganda: \"Men qadriyatlarimga mos qanday qadam tashlay olaman?\"", "\"Bugun nimaga jur'at qildim? Bu qadriyatlarimga qanday mos keldi?\"", "\"Men qo'rquv va noqulayliklarga qaramay, o'zligimni qabul qilaman.\"", "Har kuni kichik jur'atli qadam tashlang."], conclusion: "Jur'at — qo'rquv yo'qligi emas, qo'rquvga qaramay qadriyatlar asosida harakat. Haqiqiy erkinlik." },
  { id: 33, title: "Qadriyatlarni amalda qo'llash", en: "Values in Action", idea: "Qadriyatlar nazariy emas, amaliy harakatlar orqali mazmunli bo'ladi. Kompas emas faqat, sayohat.", mistakes: ["Qadriyatlarni faqat yozib qo'yish.", "Mukammal bo'lishni kutish.", "Qadriyatlarni unutish.", "Qadriyatlarni faqat maqsad sifatida ko'rish."], exercises: ["\"Bugun qadriyatlarimga mos qanday harakat qildim?\"", "Har kuni kichik qadriyatli qadam: mehribonlik, halollik, yordam.", "Qaror qabul qilishda: \"Bu qaror qadriyatlarimga mosmi?\"", "Qo'rquv kelganda: \"Qo'rquvga qaramay qadriyatlarimga mos qanday harakat qila olaman?\""], conclusion: "Qadriyatlar amalda mazmunli. Kichik qadamlar hayotni o'zgartiradi." },
  { id: 34, title: "Qat'iy harakat", en: "Committed Action", idea: "Haqiqiy o'zgarish — qat'iy harakat. Qadriyatlar asosida qadam tashlash, qo'rquv va og'riqqa qaramay.", mistakes: ["Harakatni mukammallik sifatida ko'rish.", "Harakatni kechiktirish.", "Harakatni faqat motivatsiyaga bog'lash.", "Qadriyatlarni unutish."], exercises: ["Har kuni qadriyat asosida kichik qadam.", "\"Bugun qadriyatlarimga mos qanday harakat qildim?\"", "Haftalik harakat rejasini tuzing.", "Qo'rquv kelganda: \"Qo'rquvga qaramay qanday qadam tashlay olaman?\""], conclusion: "Haqiqiy o'zgarish qat'iy harakat orqali. Kichik qadamlar mazmunli hayotning kaliti." },
  { id: 35, title: "Ochiqlik bilan yashash", en: "Living with Openness", idea: "Ochiqlik — fikrlar, hissiyotlar, og'riq va quvonchlarni qabul qilish. Haqiqiy erkinlik ochiqlik orqali.", mistakes: ["Ochiqlikni zaiflik sifatida ko'rish.", "Faqat ijobiy hissiyotlarga ochiqlik.", "Ochiqlikni passivlik deb o'ylash.", "Qadriyatlarni unutish."], exercises: ["\"Bugun qanday hissiyotlarga ochiq bo'ldim?\"", "Og'riq kelganda: \"Men bu og'riqqa ochiqman.\"", "Quvonch kelganda to'liq his qiling.", "\"Bugun qadriyatlarimga mos qanday ochiqlik ko'rsatdim?\""], conclusion: "Ochiqlik — kuch. Barcha hissiyotlarni qabul qilish va qadriyatlar asosida yashash." },
  { id: 36, title: "Mindfulness amaliyoti", en: "The Practice of Mindfulness", idea: "Mindfulness — hozirgi lahzaga ongli qaytish, fikr va hissiyotlarni kuzatish. Doimiy mashq.", mistakes: ["Mindfulnessni mukammallik sifatida ko'rish.", "Mindfulnessni faqat meditatsiya deb o'ylash.", "Tezkor yechim sifatida ko'rish.", "Qadriyatlarni unutish."], exercises: ["Har kuni 5 daqiqa nafasni kuzating.", "Salbiy fikrni bulutda tasavvur qiling.", "Ovqatlanayotganda ta'mni, hidni to'liq his qiling.", "\"Bugun qadriyatlarimga mos holda hozirgi lahzani qanday his qildim?\""], conclusion: "Mindfulness — hozirgi lahzaga ongli qaytish. Doimiy mashq ichki erkinlikni oshiradi." },
  { id: 37, title: "Barqarorlik san'ati", en: "The Art of Persistence", idea: "Haqiqiy o'zgarish — barqarorlik. Qadriyatlar yo'nalishida doimiy qadam, hatto qo'rquv yoki charchoq bo'lsa ham.", mistakes: ["Barqarorlikni mukammallik sifatida ko'rish.", "Motivatsiyaga qaram bo'lish.", "Qiyinchiliklarda to'xtash.", "Qadriyatlarni unutish."], exercises: ["Har kuni qadriyatlar asosida kichik qadam.", "\"Bugun qanday barqaror qadam tashladim?\"", "Og'riq yoki qo'rquv kelganda: \"Qadriyatlarimga mos qanday qadam tashlay olaman?\"", "Haftalik barqarorlik rejasini tuzing."], conclusion: "Barqarorlik — mazmunli hayotning kaliti. Kichik va doimiy qadriyatli qadamlar." },
  { id: 38, title: "Og'riq qarshisida chidamlilik", en: "Resilience in the Face of Pain", idea: "Chidamlilik — og'riqni yo'qotish emas, unga qaramay qadriyatlar asosida yashash.", mistakes: ["Og'riqni yo'qotishga urinish.", "Chidamlilikni zaiflikni yashirish deb o'ylash.", "Mukammallikni kutish.", "Qadriyatlarni unutish."], exercises: ["Og'riq kelganda: \"Men bu og'riqqa qaramay davom etaman.\"", "\"Bugun qanday qiyinchilikka qaramay davom etdim?\"", "\"Qadriyatlarimga mos qanday qadam tashlay olaman?\"", "Har kuni kichik chidamli qadam."], conclusion: "Chidamlilik — og'riqni tan olib, qadriyatlar asosida davom etish. Yiqilib ham qayta turish kuch." },
  { id: 39, title: "ACTni kundalik hayotga singdirish", en: "Integrating ACT into Daily Life", idea: "ACT faqat nazariy emas, kundalik hayotda qo'llanadigan amaliyot. Har kun — qabul qilish, mindfulness, qadriyatlar.", mistakes: ["ACTni faqat mashg'ulot sifatida ko'rish.", "Mukammallikni kutish.", "Qadriyatlarni unutish.", "Tezkor yechim sifatida ko'rish."], exercises: ["Kundalik vazifalarda hozirgi lahzani to'liq his qiling.", "\"Bugun qadriyatlarimga mos qanday harakat qildim?\"", "Og'riq yoki tashvish kelganda: \"Men bu hissiyotlarga joy beraman.\"", "Har kuni kichik qadriyatli qadam."], conclusion: "ACT kundalik hayotda qo'llanadigan amaliyot. Kichik va doimiy qadamlar mazmunli hayot yaratadi." },
  { id: 40, title: "Mazmunli hayot", en: "A Meaningful Life", idea: "Hayotning eng oliy maqsadi — mazmunli hayot. Qadriyatlar asosida yashash, og'riqni qabul qilish, hozirgi lahzani his qilish.", mistakes: ["Mazmunli hayotni baxt bilan adashtirish.", "Mazmunni tashqi narsalarda izlash.", "Og'riqni mazmunga zid deb ko'rish.", "Mazmunni kechiktirish — keyinroq mazmunli yashayman."], exercises: ["Qadriyatlar manifestini yozing: muhim qadriyatlar va ularni qanday qo'llashni rejalashtiring.", "\"Bugun qanday mazmunli harakat qildim?\"", "Og'riq kelganda: \"Bu og'riq qaysi mazmunli qadriyatim bilan bog'liq?\"", "Har kuni bir necha daqiqa nafas, atrof, hissiyotlarni his qiling."], conclusion: "Mazmunli hayot — qadriyatlar asosida yashash, og'riqni qabul qilish, hozirgi lahzani his qilish. Haqiqiy erkinlik." },
];

const TOP10 = [
  { n: 1, title: "Baxtni izlamang, mazmun yarating", text: "Baxt yon mahsul, maqsad emas." },
  { n: 2, title: "Qabul qilish — erkinlikning kaliti", text: "Og'riq va qo'rquvni nazorat qilish emas, ularga joy berish." },
  { n: 3, title: "Mindfulness — hozirgi lahzani his qilish", text: "Fikr va hissiyotlarni kuzatish, ularga yopishib qolmaslik." },
  { n: 4, title: "Fikrlar haqiqat emas", text: "Ularni so'z sifatida ko'rish — kognitiv defuziya." },
  { n: 5, title: "O'zini kuzatish — ichki erkinlik", text: "O'zini fikr va hissiyotlardan ajratib, kuzatuvchi sifatida tanish." },
  { n: 6, title: "Qadriyatlar — hayotning kompasidir", text: "Har bir qadriyat yo'l ko'rsatuvchi, harakat esa sayohat." },
  { n: 7, title: "Jur'at — qo'rquv yo'qligi emas", text: "Qo'rquvga qaramay qadriyatlar asosida harakat qilish." },
  { n: 8, title: "Barqarorlik — doimiy kichik qadamlar", text: "Kichik va uzluksiz qadriyatli harakatlar hayotni o'zgartiradi." },
  { n: 9, title: "Chidamlilik — davom etish", text: "Og'riq va qiyinchiliklarga qaramay davom etish. Yiqilib ham qayta turish." },
  { n: 10, title: "Mazmunli hayot — qadriyatlar asosida", text: "Hozirgi lahzani to'liq his qilish va qadriyatlar yo'nalishida qat'iy qadam." },
];

const WEEKLY = [
  { day: "Dushanba", theme: "Qabul qilish va mazmun", tasks: ["Ertalab: \"Bugun qanday mazmunli harakat qilaman?\"", "Kechqurun: Og'riq kelganda \"Men bu hissiyotlarga joy beraman.\""] },
  { day: "Seshanba", theme: "Mindfulness va fikrlar", tasks: ["5 daqiqa nafasni kuzating.", "Salbiy fikrni bulut sifatida tasavvur qiling."] },
  { day: "Chorshanba", theme: "O'zini kuzatish va qadriyatlar", tasks: ["\"Men fikrlarim emasman, men kuzatuvchiman.\"", "Kundalik: \"Bugun qadriyatlarimga mos qanday harakat qildim?\""] },
  { day: "Payshanba", theme: "Jur'at va barqarorlik", tasks: ["Kichik jur'atli qadam: qo'rquvga qaramay gapiring.", "Haftalik reja: 3 ta kichik qadriyatli vazifa."] },
  { day: "Juma", theme: "Chidamlilik va davom etish", tasks: ["Qiyinchilikda: \"Qadriyatlarimga mos qanday davom etishim mumkin?\"", "Charchoq bo'lsa ham kichik bir chidamli qadam."] },
  { day: "Shanba", theme: "Mazmun va hozirgi lahza", tasks: ["\"Bugun qanday mazmunli harakat qildim?\"", "Bir necha daqiqa nafas, atrof va hissiyotlarni his qiling."] },
  { day: "Yakshanba", theme: "Umumiy integratsiya", tasks: ["Haftadagi mashqlarni qayta ko'rib chiqing.", "Keyingi hafta uchun qadriyat asosida yangi qadamlar belgilang."] },
];

const ROADMAP = [
  { phase: "1-bosqich", duration: "1–2 oy", goal: "Asosni mustahkamlash", color: "#4A90E2", tasks: ["Har kuni 5–10 daqiqa mindfulness mashqlari.", "Har kuni qadriyat kundaligi yozish.", "Og'riq kelganda: \"Men bu hissiyotlarga joy beraman.\""] },
  { phase: "2-bosqich", duration: "3–4 oy", goal: "Jur'at va barqarorlik", color: "#7B5EA7", tasks: ["Har hafta 2 ta jur'atli qadam.", "Haftalik reja: 3–5 ta kichik qadriyatli vazifa.", "\"Bugun qanday barqaror qadam tashladim?\""] },
  { phase: "3-bosqich", duration: "5–6 oy", goal: "Chidamlilik va ochiqlik", color: "#E8805A", tasks: ["Og'riq kelganda: \"Qadriyatlarimga mos davom etishim mumkin?\"", "Har kuni hissiyotga ochiqlik mashqi.", "\"Bugun qanday chidamli qadam tashladim?\""] },
  { phase: "4-bosqich", duration: "7–12 oy", goal: "Mazmunli hayotni shakllantirish", color: "#2ECC71", tasks: ["Qadriyat manifestini yozing.", "\"Bugun qanday mazmunli harakat qildim?\"", "Har kuni hozirgi lahzani to'liq his qiling."] },
];

const SECTIONS = ["Boblar", "10 Saboq", "Haftalik jadval", "Yo'l xaritasi"];

export default function App() {
  const [activeSection, setActiveSection] = useState(0);
  const [activeChapter, setActiveChapter] = useState(null);
  const [search, setSearch] = useState("");
  const [expandedTab, setExpandedTab] = useState("idea");

  const filtered = CHAPTERS.filter(c =>
    c.title.toLowerCase().includes(search.toLowerCase()) ||
    c.en.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ fontFamily: "'Segoe UI', Tahoma, sans-serif", minHeight: "100vh", background: "linear-gradient(135deg, #0F0C29 0%, #1a1a4e 50%, #24243e 100%)", color: "#e8e8f0" }}>
      {/* Header */}
      <div style={{ background: "rgba(255,255,255,0.05)", backdropFilter: "blur(10px)", borderBottom: "1px solid rgba(255,255,255,0.1)", padding: "16px 20px", position: "sticky", top: 0, zIndex: 100 }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
            <span style={{ fontSize: 22 }}>🧠</span>
            <div>
              <div style={{ fontSize: 16, fontWeight: 700, color: "#a78bfa" }}>Alfa Live | Nevroz</div>
              <div style={{ fontSize: 11, color: "#8888aa" }}>Russ Harris • ACT Psixoterapiya • 40 bob</div>
            </div>
          </div>
          {/* Nav */}
          <div style={{ display: "flex", gap: 6, marginTop: 12, flexWrap: "wrap" }}>
            {SECTIONS.map((s, i) => (
              <button key={i} onClick={() => { setActiveSection(i); setActiveChapter(null); setSearch(""); }}
                style={{ padding: "6px 14px", borderRadius: 20, border: "none", cursor: "pointer", fontSize: 12, fontWeight: 600, transition: "all 0.2s",
                  background: activeSection === i ? "linear-gradient(135deg, #7c3aed, #4f46e5)" : "rgba(255,255,255,0.08)",
                  color: activeSection === i ? "#fff" : "#aaa" }}>
                {s}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 900, margin: "0 auto", padding: "20px 16px" }}>

        {/* CHAPTERS */}
        {activeSection === 0 && !activeChapter && (
          <div>
            <input value={search} onChange={e => setSearch(e.target.value)}
              placeholder="🔍 Bob qidiring..."
              style={{ width: "100%", padding: "12px 16px", borderRadius: 12, border: "1px solid rgba(255,255,255,0.15)", background: "rgba(255,255,255,0.05)", color: "#e8e8f0", fontSize: 14, marginBottom: 20, boxSizing: "border-box", outline: "none" }} />
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 12 }}>
              {filtered.map(ch => (
                <div key={ch.id} onClick={() => setActiveChapter(ch)}
                  style={{ background: "rgba(255,255,255,0.06)", borderRadius: 14, padding: "16px", cursor: "pointer", border: "1px solid rgba(255,255,255,0.08)", transition: "all 0.2s" }}
                  onMouseEnter={e => e.currentTarget.style.background = "rgba(124,58,237,0.2)"}
                  onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,0.06)"}>
                  <div style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                    <div style={{ minWidth: 32, height: 32, borderRadius: 8, background: "linear-gradient(135deg, #7c3aed, #4f46e5)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, color: "#fff" }}>{ch.id}</div>
                    <div>
                      <div style={{ fontSize: 14, fontWeight: 600, color: "#c4b5fd", marginBottom: 2 }}>{ch.title}</div>
                      <div style={{ fontSize: 11, color: "#6b7280" }}>{ch.en}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CHAPTER DETAIL */}
        {activeSection === 0 && activeChapter && (
          <div>
            <button onClick={() => setActiveChapter(null)}
              style={{ background: "rgba(255,255,255,0.1)", border: "none", color: "#a78bfa", padding: "8px 16px", borderRadius: 20, cursor: "pointer", fontSize: 13, marginBottom: 20 }}>
              ← Ortga
            </button>
            <div style={{ background: "rgba(255,255,255,0.05)", borderRadius: 18, padding: 24, border: "1px solid rgba(255,255,255,0.1)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
                <div style={{ width: 48, height: 48, borderRadius: 12, background: "linear-gradient(135deg, #7c3aed, #4f46e5)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, fontWeight: 700, color: "#fff", flexShrink: 0 }}>{activeChapter.id}</div>
                <div>
                  <div style={{ fontSize: 20, fontWeight: 700, color: "#c4b5fd" }}>📖 {activeChapter.title}</div>
                  <div style={{ fontSize: 13, color: "#6b7280" }}>{activeChapter.en}</div>
                </div>
              </div>

              {/* Tabs */}
              <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
                {[["idea", "🔑 G'oya"], ["mistakes", "⚠️ Xatolar"], ["exercises", "🧩 Mashqlar"], ["conclusion", "🌟 Xulosa"]].map(([k, l]) => (
                  <button key={k} onClick={() => setExpandedTab(k)}
                    style={{ padding: "6px 14px", borderRadius: 20, border: "none", cursor: "pointer", fontSize: 12, fontWeight: 600,
                      background: expandedTab === k ? "linear-gradient(135deg, #7c3aed, #4f46e5)" : "rgba(255,255,255,0.08)",
                      color: expandedTab === k ? "#fff" : "#aaa" }}>{l}</button>
                ))}
              </div>

              {expandedTab === "idea" && (
                <div style={{ background: "rgba(124,58,237,0.15)", borderRadius: 12, padding: 16, borderLeft: "3px solid #7c3aed", fontSize: 14, lineHeight: 1.7, color: "#d1d5db" }}>{activeChapter.idea}</div>
              )}
              {expandedTab === "mistakes" && (
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  {activeChapter.mistakes.map((m, i) => (
                    <div key={i} style={{ background: "rgba(239,68,68,0.1)", borderRadius: 10, padding: "10px 14px", borderLeft: "3px solid #ef4444", fontSize: 13, color: "#fca5a5" }}>⚠️ {m}</div>
                  ))}
                </div>
              )}
              {expandedTab === "exercises" && (
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {activeChapter.exercises.map((ex, i) => (
                    <div key={i} style={{ background: "rgba(16,185,129,0.1)", borderRadius: 10, padding: "12px 14px", borderLeft: "3px solid #10b981", fontSize: 13, color: "#6ee7b7" }}>
                      <span style={{ fontWeight: 600, color: "#34d399" }}>Mashq {i + 1}:</span> {ex}
                    </div>
                  ))}
                </div>
              )}
              {expandedTab === "conclusion" && (
                <div style={{ background: "rgba(245,158,11,0.1)", borderRadius: 12, padding: 16, borderLeft: "3px solid #f59e0b", fontSize: 14, lineHeight: 1.7, color: "#fde68a" }}>🌟 {activeChapter.conclusion}</div>
              )}

              {/* Nav between chapters */}
              <div style={{ display: "flex", justifyContent: "space-between", marginTop: 24 }}>
                {activeChapter.id > 1 ? (
                  <button onClick={() => setActiveChapter(CHAPTERS[activeChapter.id - 2])}
                    style={{ background: "rgba(255,255,255,0.08)", border: "none", color: "#a78bfa", padding: "8px 16px", borderRadius: 20, cursor: "pointer", fontSize: 12 }}>
                    ← {activeChapter.id - 1}-bob
                  </button>
                ) : <div />}
                {activeChapter.id < 40 && (
                  <button onClick={() => setActiveChapter(CHAPTERS[activeChapter.id])}
                    style={{ background: "linear-gradient(135deg, #7c3aed, #4f46e5)", border: "none", color: "#fff", padding: "8px 16px", borderRadius: 20, cursor: "pointer", fontSize: 12 }}>
                    {activeChapter.id + 1}-bob →
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

        {/* TOP 10 LESSONS */}
        {activeSection === 1 && (
          <div>
            <div style={{ textAlign: "center", marginBottom: 24 }}>
              <div style={{ fontSize: 24, fontWeight: 700, color: "#c4b5fd", marginBottom: 6 }}>📌 Eng muhim 10 saboq</div>
              <div style={{ fontSize: 13, color: "#6b7280" }}>40 bobdagi asosiy tamoyillar</div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {TOP10.map(lesson => (
                <div key={lesson.n} style={{ background: "rgba(255,255,255,0.05)", borderRadius: 14, padding: "16px 20px", border: "1px solid rgba(255,255,255,0.08)", display: "flex", gap: 16, alignItems: "flex-start" }}>
                  <div style={{ width: 40, height: 40, borderRadius: "50%", background: "linear-gradient(135deg, #7c3aed, #4f46e5)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 16, color: "#fff", flexShrink: 0 }}>{lesson.n}</div>
                  <div>
                    <div style={{ fontSize: 15, fontWeight: 600, color: "#c4b5fd", marginBottom: 4 }}>{lesson.title}</div>
                    <div style={{ fontSize: 13, color: "#9ca3af", lineHeight: 1.6 }}>{lesson.text}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* WEEKLY SCHEDULE */}
        {activeSection === 2 && (
          <div>
            <div style={{ textAlign: "center", marginBottom: 24 }}>
              <div style={{ fontSize: 24, fontWeight: 700, color: "#c4b5fd", marginBottom: 6 }}>🗓 Haftalik amaliy jadval</div>
              <div style={{ fontSize: 13, color: "#6b7280" }}>Dushanbadan yakshanbagacha kundalik mashqlar</div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 12 }}>
              {WEEKLY.map((day, i) => {
                const colors = ["#7c3aed","#4f46e5","#0891b2","#059669","#d97706","#dc2626","#7c3aed"];
                return (
                  <div key={i} style={{ background: "rgba(255,255,255,0.05)", borderRadius: 14, padding: 18, border: `1px solid ${colors[i]}44` }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
                      <div style={{ width: 36, height: 36, borderRadius: 10, background: colors[i], display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, color: "#fff", fontWeight: 700 }}>{i + 1}</div>
                      <div>
                        <div style={{ fontSize: 14, fontWeight: 700, color: "#e8e8f0" }}>{day.day}</div>
                        <div style={{ fontSize: 11, color: colors[i] }}>{day.theme}</div>
                      </div>
                    </div>
                    {day.tasks.map((t, j) => (
                      <div key={j} style={{ background: `${colors[i]}18`, borderRadius: 8, padding: "8px 10px", marginBottom: 6, fontSize: 12, color: "#d1d5db", lineHeight: 1.5 }}>✓ {t}</div>
                    ))}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ROADMAP */}
        {activeSection === 3 && (
          <div>
            <div style={{ textAlign: "center", marginBottom: 24 }}>
              <div style={{ fontSize: 24, fontWeight: 700, color: "#c4b5fd", marginBottom: 6 }}>🗺 Kitobdan keyingi yo'l xaritasi</div>
              <div style={{ fontSize: 13, color: "#6b7280" }}>12 oylik bosqichli amaliy reja</div>
            </div>
            <div style={{ position: "relative" }}>
              {ROADMAP.map((phase, i) => (
                <div key={i} style={{ display: "flex", gap: 20, marginBottom: 28 }}>
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <div style={{ width: 44, height: 44, borderRadius: "50%", background: phase.color, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 16, color: "#fff", flexShrink: 0 }}>{i + 1}</div>
                    {i < 3 && <div style={{ width: 2, flex: 1, background: `${phase.color}44`, minHeight: 40, marginTop: 6 }} />}
                  </div>
                  <div style={{ flex: 1, background: "rgba(255,255,255,0.05)", borderRadius: 14, padding: "16px 20px", border: `1px solid ${phase.color}44`, marginBottom: 8 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
                      <div>
                        <div style={{ fontSize: 15, fontWeight: 700, color: phase.color }}>{phase.phase}</div>
                        <div style={{ fontSize: 12, color: "#9ca3af" }}>⏱ {phase.duration}</div>
                      </div>
                      <div style={{ marginLeft: "auto", background: `${phase.color}22`, padding: "4px 12px", borderRadius: 20, fontSize: 12, color: phase.color, fontWeight: 600 }}>{phase.goal}</div>
                    </div>
                    {phase.tasks.map((t, j) => (
                      <div key={j} style={{ background: `${phase.color}15`, borderRadius: 8, padding: "8px 12px", marginBottom: 6, fontSize: 12, color: "#d1d5db", lineHeight: 1.5, borderLeft: `2px solid ${phase.color}` }}>▶ {t}</div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <div style={{ background: "rgba(124,58,237,0.15)", borderRadius: 14, padding: 20, border: "1px solid rgba(124,58,237,0.3)", textAlign: "center" }}>
              <div style={{ fontSize: 18, marginBottom: 8 }}>🌟</div>
              <div style={{ fontSize: 14, fontWeight: 600, color: "#c4b5fd", marginBottom: 6 }}>Yakuniy tavsiya</div>
              <div style={{ fontSize: 13, color: "#9ca3af", lineHeight: 1.7 }}>Bu yo'l xaritasi sizga ACT tamoyillarini uzoq muddatli odatga aylantirishga yordam beradi. Natijada siz <strong style={{ color: "#a78bfa" }}>baxtni emas, mazmunni yaratadigan</strong>, ichki erkinlikka ega va qadriyatlar asosida yashaydigan inson bo'lasiz.</div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
