const telegraf = require ('telegraf') 
const data = require ('./ data') 
const Stage = require ('telegraf / stage') 
const session = require ('telegraf / session') 
const Scene = require ('telegraf / scenes / base ') 
const {leave} = Stage 
const stage = new Stage () 
const bot = new telegraf (data.token) 

const getName = new Scene (' getName ') 
stage.register (getName) 
const getYear = new Scene ( 'getYear') 
stage.register (getYear) 
const getEduc = new Scene ('getEduc') 
stage.register (getEduc) 
const getTheme = new Scene ('getTheme') 
stage.register (getTheme) 
const getLangs = new Scene ('getLangs ') 
stage.register (getLangs)
const getCompSkills = new Scene ('getCompSkills') 
stage.register (getCompSkills) 
const getNumber = new Scene ('getNumber') 
stage.register (getNumber) 
const check = new Scene ('check') 
stage.register (check) 

bot. use (session ()) 
bot.use (stage.middleware ()) 


bot.hears ('️⬅️ Home', (ctx) => { 
  ctx.reply ( 
    'Enter last name, first name and middle name', 
    {reply_markup: { remove_keyboard: true}} 
  ) 
  ctx.scene.enter ('getName') 
}) 

bot.start ((ctx) => { 
  ctx.reply ( 
    'Enter last name, first name and middle name', 
    {reply_markup: {remove_keyboard: true}}   
  ) 
  ctx.scene.enter ('getName')
}) 

getName.command ('start', async (ctx) => { 
  ctx.reply ( 
    'Let's start over. Enter first name, last name and patronymic', 
    {reply_markup: {remove_keyboard: true}} 
  ) 
  await ctx.scene.leave ( 'getEduc') 
  ctx.scene.enter ('getName') 
}) 

getName.on ('text', async (ctx) => { 
  if (ctx.message.text === '◀ ️ Back') { 
    return ctx. reply ('You have already returned to the very beginning. Please enter your name') 
  } 

  ctx.session.name = ctx.message.text 
  ctx.reply ( 
    'Please enter your year of birth' + 
    `\ n \ nAlready entered: \ nF .I.O: $ {ctx.session.name} `,
    {reply_markup: {keyboard: [['◀ ️ Back']], resize_keyboard: true, one_time_keyboard: true}} 
    ) 
  await ctx.scene.leave ('getName') 
  ctx.scene.enter ('getYear') 
}) 

getYear. hears (/ ^ [0-9] {4} $ /, async (ctx) => { 
  ctx.session.year = ctx.message.text 
  ctx.reply ( 
    'Now tell us about your education. In which university did you study and at which faculty? '+ 
    `\ n \ nAlready entered data: \ nF.N.: $ {ctx.session.name}; \ nYear of birth: $ {ctx.session.year}`, 
    {reply_markup: {keyboard : [['◀ ️ Back', '❌ Erase all']], resize_keyboard: true, one_time_keyboard: true}} 
  ) 
  await ctx.scene.leave ('getYear') 
  ctx.scene.enter ('getEduc ') 
})

getYear.hears ('◀ ️ Back', async (ctx) => { 
  ctx.reply ( 
    'Enter last name, first name and patronymic', 
    {reply_markup: {remove_keyboard: true}} 
  ) 
  await ctx.scene.leave ('getYear') 
  ctx.scene.enter ('getName') 
}) 

getYear.on ('text', async (ctx) => { 
  ctx.reply ( 
    'Please enter only the year of birth in the format 1990' + 
    `\ n \ nAlready entered: \ n Full name: $ {ctx.session.name} `, 
    {reply_markup: {keyboard: [['◀ ️ Back', '❌ Erase all']], resize_keyboard: true, one_time_keyboard: true}} 
  ) 
}) 


getEduc .hears ('◀ ️ Back', async (ctx) => { 
  ctx.reply ( 
    'Enter the year of birth '+
    `\ n \ nAlready entered data: \ nF.L.A .: $ {ctx.session.name}`, 
    {reply_markup: {keyboard: [['◀ ️ Back', '❌ Erase all']], resize_keyboard: true, one_time_keyboard: true}} 
  ) 
  await ctx.scene.leave ('getEduc') 
  ctx.scene.enter ('getYear') 
}) 

getEduc.hears (['❌ Erase everything', '/ start'], async (ctx) => { 
  ctx.reply ('Let's start over. Enter first name, last name and patronymic', {reply_markup: {remove_keyboard: true}}) 
  await ctx.scene.leave ('getEduc') 
  ctx.scene.enter ('getName') 
}) 

getEduc.on ('text', async (ctx) => { 
  ctx.session.educ = ctx.message.text 
  ctx.reply ( 
    'Write the topic of your thesis' +
    `\ n \ nAlready entered data: \ nSurname: $ {ctx.session.name}; \ nYear of birth: $ {ctx.session.year}; \ nEducation: $ {ctx.session.educ}`, 
    {reply_markup: {keyboard: [['◀ ️ Back', '❌ Erase all']], resize_keyboard: true, one_time_keyboard: true}} 
  ) 
  await ctx.scene.leave ('getEduc') 
  ctx.scene.enter ('getTheme ') 
}) 


getTheme.hears (' ◀ ️ Back ', async (ctx) => { 
  ctx.reply ( 
    ' Now tell us about your education. What university did you study at and which faculty? '+ 
    `\ n \ nAlready entered data: \ nSurname: $ {ctx.session.name}; \ nYear of birth: $ {ctx.session.year} `, 
    {reply_markup: {keyboard: [['◀ ️ Back', '❌ Erase everything' ]], resize_keyboard: true,one_time_keyboard: true}} 
  )
  await ctx.scene.leave ('getTheme') 
  ctx.scene.enter ('getEduc') 
}) 

getTheme.hears (['❌ Erase everything', '/ start'], async (ctx) => { 
  ctx.reply ('Let's start again. Enter first name, last name and middle name', {reply_markup: {remove_keyboard: true}}) 
  await ctx.scene.leave ('getTheme') 
  ctx.scene.enter ('getName') 
}) 

getTheme.on ( 'text', async (ctx) => { 
  ctx.session.theme = ctx.message.text 
  ctx.reply ( 
    'What languages ​​and at what level do you speak? \ n \ nFor example: \ nEnglish - Intermediate \ nRussian - native' + 
    `\ n \ nAlready entered data: \ nSurname: $ {ctx.session.name}; \ nYear of birth: $ {ctx.session.year}; \ nEducation: $ {ctx.session.educ}; `+
    `\ n Diploma theme: $ {ctx.session.theme}`, 
    {reply_markup: {keyboard: [['◀ ️ Back', '❌ Erase all']], resize_keyboard: true, one_time_keyboard: true}} 
  ) 
  await ctx.scene .leave ('getTheme') 
  ctx.scene.enter ('getLangs') 
}) 


getLangs.hears ('◀ ️ Back', async (ctx) => { 
  ctx.reply ( 
    'Write your thesis theme' + 
    `\ n \ nAlready entered data: \ nF. & Surname: $ {ctx.session.name}; \ nYear of birth: $ {ctx.session.year}; \ nEducation: $ {ctx.session.educ}; `, 
    {reply_markup : {keyboard: [['◀ ️ Back', '❌ Erase all']], resize_keyboard: true, one_time_keyboard: true}} 
  ) 
  await ctx.scene.leave ('getLangs') 
  ctx.scene.enter ('getTheme') 
})

getLangs.hears (['❌ Erase everything', '/ start'], async (ctx) => { 
  ctx.reply ('Let's start again. Enter first name, last name and patronymic', {reply_markup: {remove_keyboard: true}}) 
  await ctx.scene.leave ('getLangs') 
  ctx.scene.enter ('getName') 
}) 

getLangs.on ('text', async (ctx) => { 
  ctx.session.langs = ctx.message.text 
  ctx .reply ( 
    'What computer programs and at what level do you know?' + 
    '\ n \ nFor example: \ nMS Office - perfect, \ nAutoCad - medium' + 
    `\ n \ nAlready entered: \ nF.N.: $ {ctx.session.name}; \ nYear of birth: $ {ctx.session.year}; \ nEducation: $ {ctx.session.educ}; `+ 
    ` \ nTheme of the diploma: $ {ctx.session.theme};\ nLanguages: $ {ctx.session.langs} `,
    {reply_markup: {keyboard: [['◀ ️ Back', '❌ Erase all']], resize_keyboard: true, one_time_keyboard: true}} 
  ) 
  await ctx.scene.leave ('getLangs') 
  ctx.scene.enter (' getCompSkills ') 
}) 


getCompSkills.hears (' ◀ ️ Back ', async (ctx) => { 
  ctx.reply ( 
    ' What languages ​​and at what level do you speak? \ n \ nFor example: \ nEnglish - Intermediate \ nRussian - native '+ 
    ` \ n \ nAlready entered data: \ nF.L.: $ {ctx.session.name}; \ nYear of birth: $ {ctx.session.year}; \ nEducation: $ {ctx.session.educ}; `+ 
    `\ nTheme of the diploma: $ {ctx.session.theme}`, 
    {reply_markup: {keyboard: [['◀ ️ Back', '❌ Erase all']], resize_keyboard: true, one_time_keyboard:true}} 
  )
  await ctx.scene.leave ('getCompSkills') 
  ctx.scene.enter ('getLangs') 
}) 

getCompSkills.hears (['❌ Erase everything', '/ start'], async (ctx) => { 
  ctx.reply ('Let's start again. Enter first name, last name and middle name', {reply_markup: {remove_keyboard: true}}) 
  await ctx.scene.leave ('getCompSkills') 
  ctx.scene.enter ('getName') 
}) 

getCompSkills.on ( 'text', async (ctx) => { 
  ctx.session.compSkills = ctx.message.text 
  ctx.reply ( 
    'Click the Send Contact button below to share the number.' + 
    `\ n \ nAlready entered: \ nSurname: $ {ctx.session.name}; \ nYear of birth: $ {ctx.session.year}; \ nEducation: $ {ctx.session.educ}; `+
    `\ nTheme of the diploma: $ {ctx.session.theme}; \ nLanguages: $ {ctx.session.langs}; \ nComputer proficiency: $ {ctx.session.compSkills}`, 
    {reply_markup: {keyboard: [[{text : '📱 Send contact', request_contact: true}], ['◀ ️ Back', '❌ Erase all']], resize_keyboard: true, one_time_keyboard: true}} 
  ) 
  await ctx.scene.leave ('getCompSkills') 
  ctx. scene.enter ('getNumber') 
}) 


getNumber.hears ('◀ ️ Back', async (ctx) => { 
  ctx.reply ( 
    'What computer programs and at what level do you own?' + 
    '\ n \ n For example: \ nMS Office - perfect, \ nAutoCad - medium '+ 
    `\ n \ nAlready entered data: \ nSurname: $ {ctx.session.name}; \ nYear of birth: $ {ctx.session.year};\ nEducation: $ {ctx.session.educ}; `+
    `\ nTheme of the diploma: $ {ctx.session.theme}; \ nLanguages: $ {ctx.session.langs}`, 
    {reply_markup: {keyboard: [['◀ ️ Back', '❌ Erase all']], resize_keyboard: true, one_time_keyboard: true}} 
  ) 
  await ctx.scene.leave ('getNumber') 
  ctx.scene.enter ('getCompSkills') 
}) 

getNumber.hears (['❌ Erase everything', '/ start'], async ( ctx) => { 
  ctx.reply ('Let's start over. Please enter first, last and middle names', {reply_markup: {remove_keyboard: true}}) 
  await ctx.scene.leave (' getNumber ') 
  ctx.scene.enter (' getCompSkills ') 
  ctx.session = null 
}) 

getNumber.on (' contact ', async (ctx) => { 
  ctx.session.phone = ctx.message.contact.phone_number 
  ctx.reply (Your application is accepted. We will call you back.',

    {reply_markup: {keyboard: [['️⬅️ Home']], resize_keyboard: true, one_time_keyboard: true}} 
  ) 
  ctx.scene.leave ('main') 

  for (let key of data.admins) { 
    bot.telegram .sendMessage ( 
      key, 
      `New ticket! \ n \ nF.N.L .: [$ {ctx.session.name}] (tg: // user? id = $ {ctx.from.id}); \ nYear of birth : $ {ctx.session.year}; \ nEducation: $ {ctx.session.educ}; `+ 
      ` \ nTheme of the diploma: $ {ctx.session.theme}; \ nLanguages: $ {ctx.session.langs}; \ nComputer proficiency: $ {ctx.session.compSkills}; `+ 
      ` \ nNumber: $ {ctx.session.phone} `, 
      {parse_mode: 'markdown'} 
    ) 
  } 
  ctx.session = null 
}) 

check.hears (' ◀ ️ Back ', async (ctx) => {
  ctx.reply ( 
    'Click the "Send Contact" button below to share your number.' + 
    `\ n \ nAlready entered: \ nSurname: $ {ctx.session.name}; \ nYear of birth: $ {ctx .session.year}; \ nEducation: $ {ctx.session.educ}; `+ 
    ` \ nTheme of the diploma: $ {ctx.session.theme}; \ nLanguages: $ {ctx.session.langs}; \ nComputer proficiency: $ {ctx.session.compSkills} `, 
    {reply_markup: {keyboard: [[{text: 'Send contact', request_contact: true}], ['◀ ️ Back', '❌ Erase all']], resize_keyboard: true , one_time_keyboard: true}} 
  ) 
  await ctx.scene.leave ('check') 
  ctx.scene.enter ('getNumber') 
}) 

check.hears (['❌ Erase everything', '/ start'], async (ctx ) => {
  ctx.reply ('Let's start again. Please enter first, last and patronymic', {reply_markup: {remove_keyboard: true}}) 
  await ctx.scene.leave ('getNumber') 
  ctx.scene.enter ('getCompSkills') 
  ctx.session = null 
}) 


bot.startPolling ()
