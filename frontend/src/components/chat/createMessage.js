import React, { Component } from 'react'

export default class createMessage extends Component {
    render() {
        return (
            <div className="flex">
                <div className="w-4/5">
                    <input className="w-full border-4 p-2 border-green-500" type="text" placeholder="type here ..."/>
                </div>
                <div className="flex-grow mt-1 mr-1 text-center">
                    <buton className="cursor-pointer w-full block bg-green-300 p-2 flex justify-center items-baseline">
                        <span>
                            Send
                        </span>

                    </buton>
                </div>
            </div>
            
        )
    }
}
