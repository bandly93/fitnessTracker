import passport from 'passport';
import {Strategy} from 'passport-local';

passport.use('local',new Strategy({passReqToCallback :true},(req,username,password,done) => {
	let getAccountString = 'SELECT id, "firstName", "lastName", "email", "password" FROM "users" WHERE "email"=$1';
	loginAttempt = async () => {
		const client = await pool.connect();
		try {
			await client.query('BEGIN')
			let checkExist = await JSON.stringify(client.query(getAccountString,[username],(err,result) => {
				if(err){
					return done(err);
				}
				if(!result.rows[0]){
					req.flash('danger', "Oops. Incorrect login details.");
					return done(null,false);
				}else{
					bcrypt.compare(password,result.rows[0].password,(err,check) => {
						if(err){
							console.log('Error while checking password');
						}else if(check){
							return done(null,[{email:result.rows[0].email,firstName : result.rows[0].firstName}]);
						}else{
							req.flash('danger', "Oop. Incorrect login details.");
							return done(null,false);
						}
					});
				}
			}))
		}
		catch(e){
			throw(e);
		}
	}();
}))

