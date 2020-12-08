module.exports={

	rewrite:true,
	forceRewrite:false,
	
  database:{
    autoStartServer: true,
		host: "localhost",
		username: "root",
		password: "",
		name: "chat",
		dialect: 'mysql',
		refresh: false
  }
}
