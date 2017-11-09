<template>
    <header class="header">
        <nav class="navbar navbar-expand-lg">
            <div class="search-panel">
                <div class="search-inner d-flex align-items-center justify-content-center">
                    <div class="close-btn">Close <i class="fa fa-close"></i></div>
                    <form id="searchForm" action="#">
                        <div class="form-group">
                            <input type="search" name="search" placeholder="What are you searching for...">
                            <button type="submit" class="submit">Search</button>
                        </div>
                    </form>
                </div>
            </div>
            <div class="container-fluid d-flex align-items-center justify-content-between">
                <div class="navbar-header">
                    <a href="index.html" class="navbar-brand">
                        <div class="brand-text brand-big visible text-uppercase">
                            <strong class="text-primary">HIT</strong>
                            <strong>Scraper</strong>
                        </div>
                        <div class="brand-text brand-sm"><strong class="text-primary">H</strong><strong>S</strong></div>
                    </a>
                    <button class="sidebar-toggle"><i class="fa fa-long-arrow-left"></i></button>
                </div>
                <ul class="right-menu list-inline no-margin-bottom">
                    <li class="list-inline-item">Next refresh in {{ timeLeft }}</li>
<!--                     <li class="list-inline-item dropdown">
                        <a id="navbarDropdownMenuLink1" href="http://example.com" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" class="nav-link messages-toggle">
                            <i class="fa fa-envelope-o"></i><span class="badge dashbg-1">5</span>
                        </a>
                        <ul aria-labelledby="navbarDropdownMenuLink1" class="dropdown-menu messages">
                            <li>
                                <a href="#" class="dropdown-item message d-flex align-items-center">
                                    <div class="profile">
                                        <img src="img/avatar-3.jpg" alt="..." class="img-fluid">
                                        <div class="status online"></div>
                                    </div>
                                    <div class="content">   <strong class="d-block">Nadia Halsey</strong><span class="d-block">lorem ipsum dolor sit amit</span><small class="date d-block">9:30am</small></div>
                                </a>
                            </li>
                            <li>
                                <a href="#" class="dropdown-item message d-flex align-items-center">
                                    <div class="profile">
                                        <img src="img/avatar-2.jpg" alt="..." class="img-fluid">
                                        <div class="status away"></div>
                                    </div>
                                    <div class="content">   <strong class="d-block">Peter Ramsy</strong><span class="d-block">lorem ipsum dolor sit amit</span><small class="date d-block">7:40am</small></div>
                                </a>
                            </li>
                            <li>
                                <a href="#" class="dropdown-item message d-flex align-items-center">
                                    <div class="profile">
                                        <img src="img/avatar-1.jpg" alt="..." class="img-fluid">
                                        <div class="status busy"></div>
                                    </div>
                                    <div class="content">   <strong class="d-block">Sam Kaheil</strong><span class="d-block">lorem ipsum dolor sit amit</span><small class="date d-block">6:55am</small></div>
                                </a>
                            </li>
                            <li>
                                <a href="#" class="dropdown-item message d-flex align-items-center">
                                    <div class="profile">
                                        <img src="img/avatar-5.jpg" alt="..." class="img-fluid">
                                        <div class="status offline"></div>
                                    </div>
                                    <div class="content">   <strong class="d-block">Sara Wood</strong><span class="d-block">lorem ipsum dolor sit amit</span><small class="date d-block">10:30pm</small></div>
                                </a>
                            </li>
                            <li><a href="#" class="dropdown-item text-center message"> <strong>See All Messages <i class="fa fa-angle-right"></i></strong></a></li>
                        </ul>
                    </li> -->
                    <li class="list-inline-item logout">
                        <a id="logout" @click.prevent="exit" href="#" class="nav-link">Exit <i class="fa fa-sign-out"></i></a>
                    </li>
                </ul>
            </div>
        </nav>
    </header>
</template>

<script>

    export default {
        props: {
            timeLeft: {
                type: Number,
                required: true
            }
        },
        methods: {
            exit() {
                console.log('reload');
                window.location.reload();
            }
        }
    }

</script>
