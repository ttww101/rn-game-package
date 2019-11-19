//
//  BridgeDelegate.m
//  rn
//
//  Created by Jack on 2019/10/18.
//  Copyright © 2019 com. All rights reserved.
//

#import "BridgeDelegate.h"
#import <React/RCTBundleURLProvider.h>

@implementation BridgeDelegate

#if DEBUG
static NSURL *serverRootWithHostPort(NSString *hostPort)
{
    if([hostPort rangeOfString:@":"].location != NSNotFound){
        return [NSURL URLWithString:
                [NSString stringWithFormat:@"http://%@/",
                 hostPort]];
    }
    return [NSURL URLWithString:
            [NSString stringWithFormat:@"http://%@:%lu/",
             hostPort, (unsigned long)kRCTBundleURLProviderDefaultPort]];
}

- (BOOL)isPackagerRunning:(NSString *)host
{
  NSURL *url = [serverRootWithHostPort(host) URLByAppendingPathComponent:@"status"];
  
  NSURLSession *session = [NSURLSession sharedSession];
  NSURLRequest *request = [NSURLRequest requestWithURL:url];
  __block NSURLResponse *response;
  __block NSData *data;
  
  dispatch_semaphore_t semaphore = dispatch_semaphore_create(0);
  [[session dataTaskWithRequest:request
            completionHandler:^(NSData *d,
                                NSURLResponse *res,
                                __unused NSError *err) {
              data = d;
              response = res;
              dispatch_semaphore_signal(semaphore);
            }] resume];
  dispatch_semaphore_wait(semaphore, DISPATCH_TIME_FOREVER);
  
  NSString *status = [[NSString alloc] initWithData:data encoding:NSUTF8StringEncoding];
  return [status isEqualToString:@"packager-status:running"];
}

- (NSString *)guessPackagerHost
{
  static NSString *ipGuess;
  static dispatch_once_t onceToken;
  dispatch_once(&onceToken, ^{
    NSString *ipPath = [[NSBundle mainBundle] pathForResource:@"ip" ofType:@"txt"];
    ipGuess = [[NSString stringWithContentsOfFile:ipPath encoding:NSUTF8StringEncoding error:nil]
               stringByTrimmingCharactersInSet:[NSCharacterSet newlineCharacterSet]];
  });

  NSString *host = ipGuess ?: @"localhost";
  if ([self isPackagerRunning:host]) {
    return host;
  }
  return nil;
}

#endif


- (NSURL *)sourceURLForBridge:(RCTBridge *)bridge
{
//    return [NSURL URLWithString:@"http://localhost:8081/index.bundle?platform=ios&dev=true&minify=false"];
    

#if DEBUG
    //    return [NSURL URLWithString:@"http://localhost:8081/index.bundle?platform=ios&dev=true&minify=false"];
    
    NSString * bundleRoot = @"index";
    NSString * packagerHost = [self guessPackagerHost];
    BOOL enableDev = YES;
    BOOL enableMinification = NO;
    
    NSString *path = [NSString stringWithFormat:@"/%@.bundle", bundleRoot];
    // When we support only iOS 8 and above, use queryItems for a better API.
    NSString *query = [NSString stringWithFormat:@"platform=ios&dev=%@&minify=%@",
                        enableDev ? @"true" : @"false",
                        enableMinification ? @"true": @"false"];
    return [RCTBundleURLProvider resourceURLForResourcePath:path packagerHost:packagerHost query:query];
    
    return [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index" fallbackResource:nil];
#else
    return [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
#endif
}

@end
