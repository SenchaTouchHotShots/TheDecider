/*
 * File: app/controller/mainView.js
 *
 * This file was generated by Sencha Architect version 2.0.0.
 * http://www.sencha.com/products/architect/
 *
 * This file requires use of the Sencha Touch 2.0.x library, under independent license.
 * License of Sencha Architect does not include license for Sencha Touch 2.0.x. For more
 * details see http://www.sencha.com/license or contact license@sencha.com.
 *
 * This file will be auto-generated each and everytime you save your project.
 *
 * Do NOT hand edit this file.
 */

Ext.define('MyApp.controller.mainView', {
    extend: 'Ext.app.Controller',
    requires: 'Ext.DateExtras',
    config: {
        views: [ 'confirmLocation', 'restaurantList', 'ViewPortContainer', 'friendChooser', 'restaurantDetails'],
        stores: [ 'ContactStore', 'RestaurantStore'],
        refs: {
            viewContainer: '#viewport',
            mainView: '#mainView',
            startButton: '#homeScreen button[action="go"]',
            cancelButton: 'button[action="cancel"]',
            finishButton: 'button[action="finish"]',
            locationButton: 'button[action="newlocation"]',
            nextButton: 'button[action="choosefriends"]',
            map: 'confirmlocation map',
            restaurantList: 'restaurantlist',
            friendList: 'friendchooser list'
        },
        control: {
            startButton: {
                tap: 'doStart'
            },
            cancelButton: {
                tap: 'doCancel'
            },
            locationButton: {
                tap: 'doNewLocation'
            },
            nextButton: {
                tap: 'doChooseFriends'
            },
            finishButton: {
                tap: 'doShowRestaurants'
            },
            restaurantList: {
                disclose: 'doShowRestaurantDetails'
            }
        }
    },
    doStart: function() {
        var contactStore = Ext.getStore('Contacts');
        contactStore.load();
        console.log(contactStore);
        if(contactStore.getCount() > 0) {
            this.getMainView().push({ xtype: 'confirmlocation' });
        } else {
            Ext.Msg.confirm('No Contacts', 'You will need to add some contacts before we can search for restaurants. Would you like to add contacts now?', function(btn){
                if(btn == 'yes') {
                    Ext.getCmp('viewport').setActiveItem(1);
                }
            }, this);
        }

    },
    doContacts: function(btn) {
        console.log(btn);

    },
    doCancel: function() {
        var count = this.getMainView().items.length - 1;
        this.getMainView().pop(count);
    },
    doNewLocation: function() {
        Ext.Msg.prompt(
            '',
            'Please enter the address you want to search from:',
            this.setNewLocation,
            this,
            100
        );
    },
    setNewLocation: function(buttonID, address) {
        var geocoder = new google.maps.Geocoder();
        var map = this.getMap(); // twice, once for the Ext.map, then for the google map it contains.
        geocoder.geocode({'address': address}, function(results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                map.getGeo().suspendUpdates();
                map.getMap().setCenter(results[0].geometry.location);
                var marker = new google.maps.Marker({
                    map: map.getMap(),
                    position: results[0].geometry.location,
                    title: 'My Current Location',
                    animation: google.maps.Animation.DROP
                });
                map.getGeo().setLatitude(results[0].geometry.location.lat());
                map.getGeo().setLongitude(results[0].geometry.location.lng());
            } else {
                Ext.Msg.alert('Error', 'Unable to find address.');
            }
        }); // taken from https://developers.google.com/maps/documentation/javascript/geocoding
    },
    doChooseFriends: function() {
        this.getMainView().push({ xtype: 'friendchooser' });
    },
    doShowRestaurants: function() {
        var location = this.getMap().getGeo();
        var friends = this.getFriendList().getSelection();
        var store = Ext.getStore('Restaurants');
        var categories = [];
        var dt = new Date();
        var first = true;
        Ext.each(friends, function(friend) {
            if (first) {
                categories = friend.get('categories').split(',');
                first = false;
            } else {
                categories = Ext.Array.intersect(categories, friend.get('categories').split(','));
            }
        });
        console.log('Categories: ',categories);
        store.load({
            params: {
                ll: location.getLatitude()+','+location.getLongitude(),
                client_id: FourSquare.clientID,
                client_secret: FourSquare.clientSecret,
                radius: 2000,
                categoryId: categories.join(','),
                v: Ext.Date.format(dt, 'Ymd')
            }
        });
        this.getMainView().push({xtype: 'restaurantlist', store: store});


    },
    doShowRestaurantDetails: function(list, record) {
        this.getMainView().push({xtype: 'restaurantdetails', data: record.data});
    }
});