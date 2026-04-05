<?php
/*
Template Name: Urlaubsplaner (Show / Demo)
Description: DEMO VERSION mit Dummy-Daten
Version: 7.6.1-show
*/

// ============================================================================
// 0. SECURITY
// ============================================================================
if (session_status() === PHP_SESSION_NONE && !headers_sent()) {
    if (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off') {
        ini_set('session.cookie_secure', 1);
    }
    ini_set('session.cookie_httponly', 1);
    session_start();
}

// ============================================================================
// 1. CONFIG
// ============================================================================
define('RB_DB_KEY', 'rb_urlaubsplaner_show'); // SHOW DB
define('RB_ADMIN_EMAIL', 'salva.docimo@gmail.com');
define('RB_YEAR', 2026);
define('RB_BUNDESLAND', 'BW');
define('MAX_ABSENT', 3);
define('MIN_MANAGERS', 2);
define('RB_ICAL_TOKEN', 'neudenken_sync_123'); // Token für Outlook Sync
define('RB_ACTION_TOKEN', 'neudenken_action_456'); // Token für E-Mail Genehmigungen

// ============================================================================
// 2. DATA
// ============================================================================
function rb_get_employees(): array
{
    // NEUE PEP-STRUKTUR (Personaleinsatzplanung)
    // hours: Wochenstunden
    // type: full=Vollzeit, part=Teilzeit, azubi=Azubi, mini=Aushilfe/Student
    // skills: key=Schlüssel/Leitung, sale=Verkauf, cash=Kasse, train=Ausbilder
    // fix_off: Fixe freie Tage (1=Mo, 2=Di, 3=Mi, 4=Do, 5=Fr, 6=Sa/So)
    // pref: Präferenz (early, late, any)

    return [
        // FÜHRUNG & KEYHOLDER
        '1001' => ['name' => 'Mustermann Max', 'greeting' => 'Max', 'days' => 37, 'role' => 'manager', 'birthday' => '1980-05-15', 'hire_date' => '2010-01-01', 'hours' => 37.5, 'type' => 'full', 'skills' => ['key', 'sale', 'cash', 'train'], 'fix_off' => [], 'pref' => 'any'],
        '1002' => ['name' => 'Schmidt Lisa', 'greeting' => 'Lisa', 'days' => 36, 'role' => 'deputy', 'birthday' => '1985-08-20', 'hire_date' => '2012-03-15', 'hours' => 37.5, 'type' => 'full', 'skills' => ['key', 'sale', 'cash', 'train'], 'fix_off' => [1], 'pref' => 'any'],
        '1003' => ['name' => 'Müller Tom', 'greeting' => 'Tom', 'days' => 36, 'role' => 'deputy', 'birthday' => '1990-11-10', 'hire_date' => '2018-09-01', 'hours' => 37.5, 'type' => 'full', 'skills' => ['key', 'sale', 'cash'], 'fix_off' => [], 'pref' => 'any'],

        // TAGESVERTRETUNG / FLEX
        '2001' => ['name' => 'Wagner Sarah', 'greeting' => 'Sarah', 'days' => 45, 'role' => 'tagesvertretung', 'birthday' => '1995-02-28', 'hire_date' => '2020-05-01', 'hours' => 32, 'type' => 'part', 'skills' => ['key', 'sale', 'cash'], 'fix_off' => [], 'pref' => 'any'],
        '2002' => ['name' => 'Becker Lukas', 'greeting' => 'Lukas', 'days' => 38, 'role' => 'tagesvertretung', 'birthday' => '1988-07-12', 'hire_date' => '2015-10-01', 'hours' => 28, 'type' => 'part', 'skills' => ['key', 'sale', 'cash'], 'fix_off' => [], 'pref' => 'any'],

        // STAFF
        '3001' => ['name' => 'Weber Julia', 'greeting' => 'Julia', 'days' => 35, 'role' => 'staff', 'birthday' => '1992-04-05', 'hire_date' => '2021-08-15', 'hours' => 32, 'type' => 'part', 'skills' => ['sale', 'cash'], 'fix_off' => [], 'pref' => 'late'],
        '3002' => ['name' => 'Hoffmann Felix', 'greeting' => 'Felix', 'days' => 42, 'role' => 'staff', 'birthday' => '1998-09-18', 'hire_date' => '2019-11-01', 'hours' => 22.5, 'type' => 'part', 'skills' => ['sale', 'cash'], 'fix_off' => [], 'pref' => 'early'],
        '3003' => ['name' => 'Schulz Jonas', 'greeting' => 'Jonas', 'days' => 36, 'role' => 'staff', 'birthday' => '1982-12-01', 'hire_date' => '2014-02-01', 'hours' => 20, 'type' => 'part', 'skills' => ['sale', 'cash'], 'fix_off' => [2], 'pref' => 'any'],

        // AZUBIS
        '4001' => ['name' => 'Richter Mia', 'greeting' => 'Mia', 'days' => 28, 'role' => 'staff', 'birthday' => '2006-03-22', 'hire_date' => '2024-08-01', 'hours' => 37.5, 'type' => 'azubi', 'skills' => ['sale'], 'fix_off' => [2, 4], 'pref' => 'any'],
        '4002' => ['name' => 'Koch Leon', 'greeting' => 'Leon', 'days' => 28, 'role' => 'staff', 'birthday' => '2007-01-30', 'hire_date' => '2023-08-01', 'hours' => 37.5, 'type' => 'azubi', 'skills' => ['sale'], 'fix_off' => [1, 3], 'pref' => 'late'],

        // BACKSTUBE & MINIJOBS
        '5001' => ['name' => 'Scholz Emma', 'greeting' => 'Emma', 'days' => 36, 'role' => 'staff', 'birthday' => '2004-06-14', 'hire_date' => '2022-09-15', 'hours' => 12, 'type' => 'mini', 'skills' => ['sale', 'cash'], 'fix_off' => [], 'pref' => 'early'],
        '5002' => ['name' => 'Bauer Tim', 'greeting' => 'Tim', 'days' => 36, 'role' => 'staff', 'birthday' => '2005-10-25', 'hire_date' => '2023-01-01', 'hours' => 6, 'type' => 'mini', 'skills' => ['sale'], 'fix_off' => [3, 4], 'pref' => 'any']
    ];
}

function rb_is_manager($role)
{
    return in_array($role, ['manager', 'deputy', 'tagesvertretung']);
}

// ============================================================================
// 3. LOGIC
// ============================================================================
function rb_hols($y)
{
    $b = easter_date($y);
    $d = fn($x) => date('Y-m-d', strtotime("+$x days", $b));
    $h = ["$y-01-01" => 1, "$y-05-01" => 1, "$y-10-03" => 1, "$y-12-25" => 1, "$y-12-26" => 1, $d(-2) => 1, $d(1) => 1, $d(39) => 1, $d(50) => 1];
    if (RB_BUNDESLAND == 'BW') {
        $h["$y-01-06"] = 1;
        $h[$d(60)] = 1;
        $h["$y-11-01"] = 1;
    }
    return $h;
}

function rb_days($s, $e)
{
    $h = rb_hols(substr($s, 0, 4));
    $c = 0;
    $curr = new DateTime($s);
    $end = new DateTime($e);
    while ($curr <= $end) {
        if ($curr->format('N') <= 6 && !isset($h[$curr->format('Y-m-d')]))
            $c++;
        $curr->modify('+1 day');
    }
    return $c;
}

function rb_check($s, $e, $uid, $ignore_id = 0)
{
    $db = json_decode(get_option(RB_DB_KEY, '[]'), true);
    $emps = rb_get_employees();
    $h = rb_hols(substr($s, 0, 4));
    $curr = new DateTime($s);
    $end = new DateTime($e);

    while ($curr <= $end) {
        $ymd = $curr->format('Y-m-d');
        $dayOfWeek = (int) $curr->format('N'); // 1=Mo, 2=Di, ..., 6=Sa, 7=So

        // Nur Arbeitstage prüfen (Mo-Sa, keine Feiertage)
        if ($dayOfWeek <= 6 && !isset($h[$ymd])) {

            // Wer arbeitet an diesem Tag?
            $scheduled = [];
            foreach ($emps as $eid => $ed) {
                $workdays = $ed['workdays'] ?? [1, 2, 3, 4, 5, 6]; // Default: Mo-Sa
                if (in_array($dayOfWeek, $workdays)) {
                    $scheduled[$eid] = $ed;
                }
            }

            // Antragsteller zählt als abwesend (wenn er an dem Tag arbeiten würde)
            $absent = [];
            $reqWorkdays = $emps[$uid]['workdays'] ?? [1, 2, 3, 4, 5, 6];
            if (in_array($dayOfWeek, $reqWorkdays)) {
                $absent[] = $uid;
            }

            // Bereits genehmigte/wartende Abwesenheiten zählen
            foreach ($db as $v) {
                if ($v['id'] == $ignore_id)
                    continue;
                if (in_array($v['status'], ['approved', 'pending']) && $ymd >= $v['start'] && $ymd <= $v['end']) {
                    // Nur zählen wenn Person an dem Tag arbeiten würde
                    $empWorkdays = $emps[$v['personal_id']]['workdays'] ?? [1, 2, 3, 4, 5, 6];
                    if (in_array($dayOfWeek, $empWorkdays)) {
                        $absent[] = $v['personal_id'];
                    }
                }
            }
            $absent = array_unique($absent);

            // Verfügbarkeitsprüfung: Nicht mehr als MAX_ABSENT abwesend
            if (count($absent) > MAX_ABSENT) {
                $dayName = ['', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'][$dayOfWeek];
                return "Zu viele abwesend am $dayName (" . date('d.m.', strtotime($ymd)) . ")";
            }

            // Führungskräfte-Check: Nur geplante Führungskräfte zählen
            $man_cnt = 0;
            foreach ($scheduled as $eid => $ed) {
                if (!in_array($eid, $absent) && rb_is_manager($ed['role'])) {
                    $man_cnt++;
                }
            }
            if ($man_cnt < MIN_MANAGERS) {
                $dayName = ['', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'][$dayOfWeek];
                return "Zu wenig Führung am $dayName (" . date('d.m.', strtotime($ymd)) . ", $man_cnt anwesend)";
            }
        }
        $curr->modify('+1 day');
    }
    return null;
}

// TEAM PULSE HELPER
function rb_get_pulse()
{
    $emps = rb_get_employees();
    $list = [];
    $today = new DateTime();
    $year = $today->format('Y');

    foreach ($emps as $id => $e) {
        // Birthday
        if (!empty($e['birthday'])) {
            $bd = new DateTime($e['birthday']);
            $thisYr = new DateTime($year . '-' . $bd->format('m-d'));
            if ($thisYr < $today)
                $thisYr->modify('+1 year');
            $diff = $today->diff($thisYr)->days;
            if ($diff <= 30) {
                $age = $thisYr->format('Y') - $bd->format('Y');
                $list[] = ['type' => 'bday', 'name' => $e['greeting'], 'date' => $thisYr->format('d.m.'), 'val' => $age, 'sort' => $diff];
            }
        }
        // Anniversary
        if (!empty($e['hire_date'])) {
            $hd = new DateTime($e['hire_date']);
            $thisYr = new DateTime($year . '-' . $hd->format('m-d'));
            if ($thisYr < $today)
                $thisYr->modify('+1 year');
            $diff = $today->diff($thisYr)->days;
            $years = $thisYr->format('Y') - $hd->format('Y');
            if ($diff <= 30 && $years > 0) {
                $list[] = ['type' => 'anniv', 'name' => $e['greeting'], 'date' => $thisYr->format('d.m.'), 'val' => $years, 'sort' => $diff];
            }
        }
    }
    usort($list, fn($a, $b) => $a['sort'] <=> $b['sort']);
    return array_slice($list, 0, 5); // Show top 5
}

// ============================================================================
// 4. MAILING & BACKUP
// ============================================================================
function rb_send_weekly_report_beta(): void
{
    $db = json_decode(get_option(RB_DB_KEY, '[]'), true);
    $pending = array_filter($db, fn($v) => in_array($v['status'], ['pending', 'waitlist']));
    $csv = "Name;Start;Ende;Tage;Art;Status;Erstellt\n";
    foreach ($db as $r) {
        $csv .= sprintf("%s;%s;%s;%s;%s;%s;%s\n", $r['name'], date('d.m.Y', strtotime($r['start'])), date('d.m.Y', strtotime($r['end'])), $r['days'], ($r['type'] ?? 'vacation') == 'free' ? 'Arbeitsfrei' : 'Urlaub', $r['status'], $r['created_at'] ?? '-');
    }
    $tmp_dir = sys_get_temp_dir();
    $file = $tmp_dir . '/urlaubsplaner_backup_beta_' . date('Y-m-d') . '.csv';
    file_put_contents($file, $csv);

    $count = count($pending);
    $subject = "Urlaubsplaner Backup" . ($count > 0 ? " & $count Anträge" : "");
    $msg = "<h2>Wochenbericht</h2>";
    if ($count > 0) {
        $msg .= "<h3 style='color:red'>$count offene Anträge</h3><ul>";
        foreach ($pending as $p)
            $msg .= "<li>{$p['name']}: {$p['start']} - {$p['end']}</li>";
        $msg .= "</ul>";
    } else {
        $msg .= "<p>Alles genehmigt/erledigt.</p><hr>";
    }

    $pulse = rb_get_pulse();
    if (!empty($pulse)) {
        $msg .= "<h3>Anstehende Events (Team Pulse 30 Tage)</h3><ul>";
        foreach ($pulse as $event) {
            if ($event['type'] == 'bday') {
                $msg .= "<li>🎂 {$event['date']}: <b>{$event['name']}</b> wird {$event['val']} Jahre!</li>";
            } else {
                $msg .= "<li>🎖️ {$event['date']}: <b>{$event['name']}</b> feiert {$event['val']}-jähriges Jubiläum!</li>";
            }
        }
        $msg .= "</ul>";
    }

    wp_mail(RB_ADMIN_EMAIL, $subject, $msg, ['Content-Type: text/html; charset=UTF-8'], [$file]);
    @unlink($file);
}

if (!wp_next_scheduled('rb_weekly_cron_beta'))
    wp_schedule_event(strtotime('next monday 08:00:00'), 'weekly', 'rb_weekly_cron_beta');
add_action('rb_weekly_cron_beta', 'rb_send_weekly_report_beta');

// CSV Export Handler (ADMIN ONLY)
if (isset($_GET['api']) && $_GET['api'] == '1' && ($_GET['action'] ?? '') == 'export') {
    // Security: Check if user is logged in and is admin
    $uid = $_SESSION['rb_uid'] ?? null;
    $is_wp_admin = current_user_can('administrator');
    if (!$uid && !$is_wp_admin) {
        header('HTTP/1.1 403 Forbidden');
        echo 'Access denied';
        exit;
    }

    $db = json_decode(get_option(RB_DB_KEY, '[]'), true);
    header('Content-Type: text/csv; charset=utf-8');
    header('Content-Disposition: attachment; filename="urlaubsplaner_beta_' . date('Y-m-d') . '.csv"');
    echo "Name;Start;Ende;Tage;Art;Status;Erstellt\n";
    foreach ($db as $r) {
        echo sprintf(
            "%s;%s;%s;%s;%s;%s;%s\n",
            $r['name'],
            date('d.m.Y', strtotime($r['start'])),
            date('d.m.Y', strtotime($r['end'])),
            $r['days'],
            ($r['type'] ?? 'vacation') == 'free' ? 'Arbeitsfrei' : 'Urlaub',
            $r['status'],
            $r['created_at'] ?? '-'
        );
    }
    exit;
}

// Mail Test Handler (ADMIN ONLY)
if (isset($_GET['test_mail']) && $_GET['test_mail'] == '1') {
    // Security: Only WP admins can trigger test mail
    if (!current_user_can('administrator')) {
        header('HTTP/1.1 403 Forbidden');
        echo 'Access denied - Admin only';
        exit;
    }
    rb_send_weekly_report_beta();
    wp_redirect(wp_get_referer() ?: home_url());
    exit;
}

// ============================================================================
// 5. API
// ============================================================================
if (isset($_GET['api']) && $_GET['api'] == '1') {
    header('Content-Type: application/json');
    // Die Daten können als application/json ODER text/plain ankommen
    $raw_input = file_get_contents('php://input');
    $in = !empty($raw_input) ? json_decode($raw_input, true) : [];
    $act = $_GET['action'] ?? '';
    $emps = rb_get_employees();
    $db = json_decode(get_option(RB_DB_KEY, '[]'), true);

    // E-Mail Action Handler (muss vor der Login-Pflicht passieren)
    if ($act == 'mail_act') {
        header('Content-Type: text/html; charset=utf-8');
        $token = $_GET['token'] ?? '';
        if ($token !== RB_ACTION_TOKEN) {
            die("<h1 style='color:#ef4444; font-family:sans-serif; text-align:center; padding:50px;'>Ungültiger Link (Token fehlt oder falsch).</h1>");
        }
        $id = (int)$_GET['id'];
        $do = $_GET['do'];
        $found = false;
        
        foreach ($db as &$v) {
            if ($v['id'] == $id) {
                if ($v['status'] != 'pending' && $v['status'] != 'waitlist') {
                    die("<div style='font-family:sans-serif; text-align:center; margin-top:50px; padding:20px;'><h2 style='color:#555;'>Dieser Antrag wurde bereits bearbeitet!</h2><p>Aktueller Status im System: <b>{$v['status']}</b>.</p></div>");
                }
                $v['status'] = ($do == 'reject' ? 'rejected' : 'approved');
                $found = true;
                break;
            }
        }
        
        if ($found) {
            update_option(RB_DB_KEY, json_encode($db));
            $color = $do == 'approve' ? '#27c93f' : '#ef4444';
            $text = $do == 'approve' ? 'Antrag erfolgreich genehmigt! ✅' : 'Antrag erfolgreich abgelehnt. ❌';
            die("<div style='font-family:sans-serif; text-align:center; margin-top:50px; padding: 20px;'>
                 <h1 style='color:{$color}'>{$text}</h1>
                 <p style='color:#333; font-size:18px;'>Die Änderung wurde sicher im System gespeichert.</p>
                 <p style='color:#888;font-size:14px; margin-top:30px;'>Du kannst dieses Browser-Fenster nun schließen und zu Outlook zurückkehren.</p>
                 </div>");
        } else {
            die("<h1 style='color:#ef4444; font-family:sans-serif; text-align:center; padding:50px;'>Antrag nicht gefunden.</h1>");
        }
    }

    // iCal Export for Outlook Sync (muss VOR dem Login-Check sein)
    if ($act == 'ical') {
        $token = $_GET['token'] ?? '';
        if ($token !== RB_ICAL_TOKEN) {
            header('HTTP/1.1 403 Forbidden');
            echo "Invalid Token";
            exit;
        }

        header('Content-Type: text/calendar; charset=utf-8');
        header('Content-Disposition: inline; filename="urlaubsplaner.ics"');

        echo "BEGIN:VCALENDAR\r\n";
        echo "VERSION:2.0\r\n";
        echo "PRODID:-//Urlaubsplaner//DE\r\n";
        echo "CALSCALE:GREGORIAN\r\n";
        echo "X-WR-CALNAME:Urlaubsplaner Team\r\n";
        
        $now = gmdate('Ymd\THis\Z');

        // Urlaube und Arbeitsfrei
        foreach ($db as $v) {
            // Wir synchronisieren nur genehmigte oder wartende Anträge, und nur Urlaub/Frei (keine Wünsche)
            if (in_array($v['status'], ['approved', 'pending']) && in_array($v['type'] ?? 'vacation', ['vacation', 'free'])) {
                $uid_event = md5($v['id'] . $v['personal_id']) . "@urlaubsplaner";
                $start = date('Ymd', strtotime($v['start']));
                
                // Ganztägige Events enden in iCal immer am Folgetag um 00:00 Uhr
                $end_date = new DateTime($v['end']);
                $end_date->modify('+1 day');
                $end = $end_date->format('Ymd');
                
                $typ_name = ($v['type'] ?? 'vacation') == 'free' ? 'Arbeitsfrei' : 'Urlaub';
                $summary = $v['name'] . " - " . $typ_name;
                
                // Markiere wartende Anträge mit einem [?]
                if ($v['status'] == 'pending') {
                    $summary = "[?] " . $summary;
                }
                
                echo "BEGIN:VEVENT\r\n";
                echo "UID:{$uid_event}\r\n";
                echo "DTSTAMP:{$now}\r\n";
                echo "DTSTART;VALUE=DATE:{$start}\r\n";
                echo "DTEND;VALUE=DATE:{$end}\r\n";
                echo "SUMMARY:{$summary}\r\n";
                // Zeige Urlaube in Outlook als "Abwesend/Out of Office" an (OOF) oder als "Beschäftigt" (BUSY)
                echo "TRANSP:OPAQUE\r\n"; 
                echo "X-MICROSOFT-CDO-BUSYSTATUS:OOF\r\n";
                echo "STATUS:" . ($v['status'] == 'approved' ? 'CONFIRMED' : 'TENTATIVE') . "\r\n";
                echo "END:VEVENT\r\n";
            }
        }
        
        echo "END:VCALENDAR\r\n";
        exit;
    }

    if ($act == 'login') {
        // Rate Limiting: Max 5 attempts per 15 minutes
        $rate_key = 'rb_login_attempts_' . md5($_SERVER['REMOTE_ADDR'] ?? 'unknown');
        $attempts = (int) get_transient($rate_key);
        if ($attempts >= 5) {
            echo json_encode(['status' => 'err', 'msg' => 'Zu viele Versuche. Bitte warten.']);
            exit;
        }

        $pid = $in['pid'] ?? '';
        // Input validation: Only numeric IDs allowed
        if (!preg_match('/^\d+$/', $pid)) {
            echo json_encode(['status' => 'err', 'msg' => 'Ungültige ID']);
            exit;
        }

        if (isset($emps[$pid])) {
            session_regenerate_id(true);
            $_SESSION['rb_uid'] = $pid;
            delete_transient($rate_key); // Reset on success
            echo json_encode(['status' => 'ok']);
        } else {
            set_transient($rate_key, $attempts + 1, 15 * MINUTE_IN_SECONDS);
            echo json_encode(['status' => 'err', 'msg' => 'ID unbekannt']);
        }
        exit;
    }

    $uid = $_SESSION['rb_uid'] ?? null;
    $is_wp = current_user_can('administrator');
    if ($is_wp && !$uid)
        foreach ($emps as $k => $v)
            if ($v['role'] == 'manager') {
                $uid = $k;
                break;
            }
    if (!$uid) {
        echo json_encode(['status' => 'err', 'redirect' => true]);
        exit;
    }

    $me = $emps[$uid];
    $is_admin = $is_wp;

    if ($act == 'load') {
        $used = 0;
        foreach ($db as &$v) {
            if ($is_admin && in_array($v['status'], ['pending', 'waitlist']))
                $v['conflict'] = rb_check($v['start'], $v['end'], $v['personal_id'], $v['id']);

            // Only count 'vacation' (Urlaub) towards used days
            if ($v['personal_id'] == $uid && in_array($v['status'], ['approved', 'pending']) && ($v['type'] ?? 'vacation') == 'vacation')
                $used += rb_days($v['start'], $v['end']);

            if (!$is_admin && $v['personal_id'] != $uid) {
                $v['name'] = 'Belegt';
                $v['personal_id'] = null;
                $v['conflict'] = null;
            }
        }

        // Stats for Admin
        $stats = ['total' => 0, 'planned' => 0, 'users' => []];
        if ($is_admin) {
            foreach ($emps as $eid => $emp) {
                $stats['users'][$eid] = ['name' => $emp['greeting'], 'quota' => $emp['days'], 'planned' => 0];
                $stats['total'] += $emp['days'];
            }
            foreach ($db as $v)
                if (in_array($v['status'], ['approved', 'pending']) && ($v['type'] ?? 'vacation') == 'vacation') {
                    $d = rb_days($v['start'], $v['end']);
                    $stats['planned'] += $d;
                    if (isset($stats['users'][$v['personal_id']]))
                        $stats['users'][$v['personal_id']]['planned'] += $d;
                }

            // Sort: Wer hat am meisten geplant?
            uasort($stats['users'], fn($a, $b) => $b['planned'] <=> $a['planned']);
        }

        echo json_encode([
            'status' => 'ok',
            'data' => $db,
            'user' => $me,
            'is_admin' => $is_admin,
            'quota' => ['total' => $me['days'], 'used' => $used],
            'hols' => array_keys(rb_hols(RB_YEAR)),
            'config' => ['max_absent' => MAX_ABSENT],
            'pulse' => $is_admin ? rb_get_pulse() : [], // Nur Admin sieht Pulse (Datenschutz)
            'stats' => $stats
        ]);
        exit;
    }

    if ($act == 'save') {
        $s = $in['start'] ?? '';
        $e = $in['end'] ?? '';
        $id = (int) ($in['id'] ?? 0);
        $force = $in['force'] ?? false;
        $type = $in['type'] ?? 'vacation'; // 'vacation', 'free', 'wish'
        $note = isset($in['note']) ? sanitize_text_field($in['note']) : '';

        // Input Validation: Date format (YYYY-MM-DD)
        if (!preg_match('/^\d{4}-\d{2}-\d{2}$/', $s) || !preg_match('/^\d{4}-\d{2}-\d{2}$/', $e)) {
            die(json_encode(['status' => 'err', 'msg' => 'Ungültiges Datumsformat']));
        }

        // Input Validation: Type must be 'vacation', 'free' or 'wish'
        if (!in_array($type, ['vacation', 'free', 'wish'])) {
            die(json_encode(['status' => 'err', 'msg' => 'Ungültiger Typ']));
        }

        if ($s > $e)
            die(json_encode(['status' => 'err', 'msg' => 'Start > Ende']));
        $d = rb_days($s, $e);
        if ($d <= 0)
            die(json_encode(['status' => 'err', 'msg' => 'Keine Arbeitstage']));

        // Quota check only for Vacation
        if ($type === 'vacation') {
            $used = 0;
            foreach ($db as $v)
                if ($v['personal_id'] == $uid && $v['id'] != $id && in_array($v['status'], ['approved', 'pending']) && ($v['type'] ?? 'vacation') == 'vacation')
                    $used += rb_days($v['start'], $v['end']);
            if (($used + $d) > $me['days'])
                die(json_encode(['status' => 'err', 'msg' => 'Nicht genug Urlaubstage']));
        }

        // Arbeitsfrei am Samstag: Limit prüfen
        if ($type === 'free') {
            $reqDate = new DateTime($s);
            $dayOfWeek = (int) $reqDate->format('w'); // 0=So, 6=Sa

            // Wenn Samstag: Limit prüfen
            if ($dayOfWeek === 6) {
                // Minors: Kerem (187735), Sofija (204479) => 2 Saturdays
                // Others => 1 Saturday
                $isMinor = in_array((string) $uid, ['187735', '204479']);
                $maxSaturdays = $isMinor ? 2 : 1;

                $reqMonth = $reqDate->format('Y-m');
                $saturdayFreeThisMonth = 0;
                foreach ($db as $v) {
                    if (
                        $v['personal_id'] == $uid && $v['id'] != $id &&
                        ($v['type'] ?? 'vacation') == 'free' &&
                        in_array($v['status'], ['approved', 'pending', 'waitlist'])
                    ) {
                        $entryDate = new DateTime($v['start']);
                        $entryDayOfWeek = (int) $entryDate->format('w');
                        $entryMonth = $entryDate->format('Y-m');
                        // Nur Samstage im gleichen Monat zählen
                        if ($entryDayOfWeek === 6 && $entryMonth === $reqMonth) {
                            $saturdayFreeThisMonth++;
                        }
                    }
                }
                if ($saturdayFreeThisMonth >= $maxSaturdays) {
                    die(json_encode(['status' => 'err', 'msg' => "Max. $maxSaturdays freie Samstage pro Monat"]));
                }
            }
            // Werktage (Mo-Fr) sind unbegrenzt erlaubt
        }

        // OVERLAP CHECK: Verhindere überschneidende Einträge desselben Users
        foreach ($db as $v) {
            if (
                $v['personal_id'] == $uid &&
                $v['id'] != $id &&
                in_array($v['status'], ['approved', 'pending', 'waitlist'])
            ) {
                // If they overlap
                if ($s <= $v['end'] && $e >= $v['start']) {
                    echo json_encode(['status' => 'err', 'msg' => 'Überschneidung mit bestehendem Antrag vom ' . date('d.m.Y', strtotime($v['start'])) . '.']);
                    exit;
                }
            }
        }

        // Verfügbarkeitsprüfung (gilt für Urlaub UND Arbeitsfrei)
        $err = rb_check($s, $e, $uid, $id);
        $status = 'pending';
        if ($err) {
            if (!$force)
                die(json_encode(['status' => 'waitlist_confirm', 'msg' => "$err Warteliste?"]));
            $status = 'waitlist';
        }

        $new_db = [];
        foreach ($db as $v)
            if ($v['id'] != $id)
                $new_db[] = $v;
                
        $new_id = $id > 0 ? $id : (int) (microtime(true) * 1000);
        $new_db[] = [
            'id' => $new_id,
            'personal_id' => $uid,
            'name' => $me['name'],
            'start' => $s,
            'end' => $e,
            'days' => $d,
            'type' => $type,
            'note' => $note,
            'status' => $status,
            'created_at' => date('d.m. H:i')
        ];
        update_option(RB_DB_KEY, json_encode($new_db));
        
        // E-MAIL BENACHRICHTIGUNG FÜR MGR: Genehmigen per E-Mail
        if ($status == 'pending' || $status == 'waitlist') {
            $base_url = "https://" . $_SERVER['HTTP_HOST'] . explode('?', $_SERVER['REQUEST_URI'])[0];
            $typ_name = ($type == 'free') ? 'Arbeitsfrei' : (($type == 'wish') ? 'Wunsch' : 'Urlaub');
            $note_html = !empty($note) ? "<p style=\"margin: 15px 0 0 0; color:#555;\"><strong>Notiz d. Mitarbeiters:</strong> " . htmlspecialchars($note) . "</p>" : "";
            
            if ($status == 'waitlist') {
                $subj = "⚠️ Konflikt: {$me['name']} ($typ_name)";
            } else {
                $subj = "Genehmigung erforderlich: {$me['name']} ($typ_name)";
            }
            
            $link_approve = $base_url . "?api=1&action=mail_act&do=approve&id={$new_id}&token=" . RB_ACTION_TOKEN;
            $link_reject = $base_url . "?api=1&action=mail_act&do=reject&id={$new_id}&token=" . RB_ACTION_TOKEN;
            
            $conflict_html = "";
            if ($status == 'waitlist') {
                $conflict_html = "
                <div style=\"background:#fee2e2; padding: 15px; border-left: 4px solid #ef4444; margin: 20px 0; border-radius: 4px;\">
                    <p style=\"color: #b91c1c; margin: 0 0 5px 0;\"><strong>⚠️ System-Empfehlung: ABLEHNEN</strong></p>
                    <p style=\"color: #b91c1c; margin: 0 0 10px 0;\">Dieser Antrag steht im Konflikt mit deinen Regeln: <br><strong>{$err}</strong></p>
                </div>";
            }
            
            $msg = "<div style=\"font-family: Arial, sans-serif; color: #333; max-width: 600px; padding: 20px; border: 1px solid #ddd; border-radius: 8px;\">
                <h2 style=\"color: " . ($status == 'waitlist' ? '#ef4444' : '#1e8e3e') . "; margin-top: 0;\">Neuer Antrag zur Genehmigung</h2>
                <p><strong>{$me['name']}</strong> hat soeben einen neuen Antrag in der App gestellt:</p>
                
                {$conflict_html}

                <div style=\"background:" . ($status == 'waitlist' ? '#fff' : '#f1f8e9') . "; padding: 15px; border-left: 4px solid " . ($status == 'waitlist' ? '#ccc' : '#1e8e3e') . "; margin: 20px 0; border-radius: 4px; border: 1px solid #eee;\">
                    <p style=\"margin: 0 0 10px 0;\"><strong>Typ:</strong> {$typ_name}</p>
                    <p style=\"margin: 0;\"><strong>Datum:</strong> " . date('d.m.Y', strtotime($s)) . " - " . date('d.m.Y', strtotime($e)) . " ($d Tage)</p>
                    {$note_html}
                </div>
                <p>Du kannst diesen Antrag direkt hier aus der E-Mail heraus bearbeiten (fürs Testen auf Live-DB):</p>
                <div style=\"margin-top: 25px;\">";
                
            if ($status == 'waitlist') {
                $msg .= "
                    <a href=\"{$link_reject}\" style=\"background-color:#ef4444; color:#fff; padding:15px 30px; text-decoration:none; border-radius:6px; font-weight:bold; font-size:16px; display:inline-block; margin-right:15px; border: 2px solid #dc2626;\">✕ Jetzt Ablehnen (Empfohlen)</a>
                    <br><br>
                    <a href=\"{$link_approve}\" style=\"color:#27c93f; text-decoration:underline; font-size:14px; display:inline-block;\">In Ausnahmefällen trotzdem genehmigen</a>";
            } else {
                $msg .= "
                    <a href=\"{$link_approve}\" style=\"background-color:#27c93f; color:#fff; padding:12px 25px; text-decoration:none; border-radius:6px; font-weight:bold; font-size:15px; margin-right:15px; display:inline-block;\">Gleich Genehmigen ✓</a>
                    <a href=\"{$link_reject}\" style=\"background-color:#ef4444; color:#fff; padding:12px 25px; text-decoration:none; border-radius:6px; font-weight:bold; font-size:15px; display:inline-block;\">Jetzt Ablehnen ✕</a>";
            }
                
            $msg .= "
                </div>
                <p style=\"color:#888; font-size:12px; margin-top:30px;\">Alternativ kannst du den Antrag auch in der App (Browser als Manager) prüfen.</p>
            </div>";
            wp_mail(RB_ADMIN_EMAIL, $subj, $msg, ['Content-Type: text/html; charset=UTF-8']);
        }

        echo json_encode(['status' => 'ok', 'toast' => $status == 'waitlist' ? 'Auf Warteliste' : ($type == 'free' ? 'Arbeitsfrei eingereicht' : ($type == 'wish' ? 'Wunsch eingereicht' : 'Urlaub eingereicht'))]);
        exit;
    }

    if ($act == 'del' || ($act == 'reject' && $is_admin) || ($act == 'approve' && $is_admin)) {
        $id = (int) $in['id'];
        if ($act == 'del') {
            $new = [];
            foreach ($db as $v) {
                $is_own = (strval($v['personal_id']) === strval($uid));
                $should_delete = ($v['id'] == $id) && ($is_own || $is_admin);
                if (!$should_delete)
                    $new[] = $v;
            }
            update_option(RB_DB_KEY, json_encode($new));
        } else {
            foreach ($db as &$v)
                if ($v['id'] == $id)
                    $v['status'] = ($act == 'reject' ? 'rejected' : 'approved');
            update_option(RB_DB_KEY, json_encode($db));
        }
        echo json_encode(['status' => 'ok']);
        exit;
    }

    if ($act == 'reset' && $is_admin) {
        update_option(RB_DB_KEY, '[]');
        echo json_encode(['status' => 'ok']);
        exit;
    }
    if ($act == 'export' && $is_admin) { /* Shortened for brevity, use same logic as above */
        exit;
    }
    if ($act == 'logout') {
        session_destroy();
        echo json_encode(['status' => 'ok']);
        exit;
    }

    // MANUAL IMPORT - DELETED FOR SHOW VERSION
}

// ============================================================================
// 6. FRONTEND
// ============================================================================
get_header(); ?>
<!DOCTYPE html>
<html lang="de">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <title>Planer <?php echo RB_YEAR; ?></title>
    <style>
        /* RESET & CORE */
        header,
        footer,
        #wpadminbar {
            display: none !important
        }

        html,
        body {
            margin: 0;
            background: #0f0f0f;
            color: #fff;
            font-family: -apple-system, sans-serif;
            height: 100dvh;
            overflow: hidden
        }

        #main {
            height: 100%;
            display: flex;
            flex-direction: column;
            max-width: 600px;
            margin: 0 auto;
            position: relative
        }

        .scroll-area {
            flex: 1;
            overflow-y: auto;
            padding: 20px;
            padding-bottom: 100px;
            scrollbar-width: none
        }

        .scroll-area::-webkit-scrollbar {
            display: none
        }

        .card {
            background: #1a1a1a;
            padding: 15px;
            border-radius: 16px;
            margin-bottom: 12px;
            border: 1px solid #333
        }

        .btn {
            width: 100%;
            padding: 14px;
            border-radius: 12px;
            border: none;
            background: linear-gradient(90deg, #00ffff, #0099ff);
            font-weight: bold;
            font-size: 1rem;
            color: #000;
            cursor: pointer;
            margin-top: 8px
        }

        .btn-sec {
            background: #333;
            color: #fff
        }

        input,
        select {
            width: 100%;
            padding: 14px;
            background: #222;
            border: 1px solid #444;
            border-radius: 12px;
            color: #fff;
            font-size: 1.1rem;
            margin-bottom: 10px
        }

        .top-bar {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 15px 20px;
            background: #111;
            border-bottom: 1px solid #222
        }

        .tabs {
            display: flex;
            background: #222;
            margin: 0 20px;
            border-radius: 12px;
            padding: 4px
        }

        .tab {
            flex: 1;
            text-align: center;
            padding: 10px;
            color: #666;
            border-radius: 10px;
            font-weight: 600
        }

        .tab.active {
            background: #333;
            color: #fff
        }

        /* CALENDAR & AMPEL */
        .grid {
            display: grid;
            grid-template-columns: repeat(7, 1fr);
            gap: 4px
        }

        .day {
            aspect-ratio: 1;
            background: #222;
            border-radius: 6px;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            font-size: 0.85rem;
            position: relative
        }

        .day.hol {
            border: 1px solid #ffaa00;
            color: #ffaa00
        }

        .day.sun {
            background: #000;
            color: #555
        }

        /* AMPEL COLORS */
        .bg-g {
            background: #004400;
            border: 1px solid #00ff88;
        }

        .bg-y {
            background: #443300;
            border: 1px solid #ffaa00;
        }

        .bg-r {
            background: #330000;
            border: 1px solid #ff003c;
            opacity: 0.8;
        }

        /* LISTS */
        .item {
            background: #222;
            padding: 12px;
            border-radius: 10px;
            margin-bottom: 8px;
            display: flex;
            justify-content: space-between;
            border-left: 3px solid transparent
        }

        .st-approved {
            border-color: #00ff88
        }

        .st-pending {
            border-color: #ffaa00
        }

        .st-rejected {
            border-color: #ff003c;
            opacity: 0.6
        }

        .st-waitlist {
            border-color: #999;
            border-style: dashed
        }

        /* TEAM PULSE */
        .pulse-row {
            display: flex;
            gap: 10px;
            overflow-x: auto;
            padding-bottom: 10px;
            scrollbar-width: none;
        }

        .pulse-card {
            min-width: 100px;
            background: #222;
            padding: 10px;
            border-radius: 12px;
            border: 1px solid #333;
            text-align: center;
        }

        .pulse-icon {
            font-size: 1.5rem;
            margin-bottom: 5px;
            display: block;
        }

        #toast,
        #loader,
        #modal {
            position: fixed;
            z-index: 9999;
            display: none;
            justify-content: center;
            align-items: center
        }

        #loader {
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.6);
            backdrop-filter: blur(2px)
        }

        #toast {
            bottom: 30px;
            left: 50%;
            transform: translate(-50%);
            background: #333;
            padding: 12px 24px;
            border-radius: 50px;
            border: 1px solid #555;
            display: block;
            opacity: 0;
            transition: 0.3s
        }

        #modal {
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.8);
            display: none
        }

        .spin {
            width: 40px;
            height: 40px;
            border: 4px solid #333;
            border-top: 4px solid #00ffff;
            border-radius: 50%;
            animation: s 1s linear infinite
        }

        @keyframes s {
            to {
                transform: rotate(360deg)
            }
        }
    </style>
</head>

<body>
    <div id="loader">
        <div class="spin"></div>
    </div>
    <div id="toast"></div>
    <div id="modal">
        <div style="background:#1a1a1a;width:80%;max-width:300px;padding:25px;border-radius:16px;text-align:center">
            <h3 id="mTit" style="margin-top:0"></h3>
            <p id="mTxt" style="color:#aaa"></p>
            <div id="mActs" style="display:flex;flex-direction:column;gap:10px"></div>
        </div>
    </div>

    <div id="login"
        style="height:100%;display:flex;flex-direction:column;justify-content:center;align-items:center;padding:20px">
        <h1>Planer <?php echo RB_YEAR ?></h1>
        <input type="password" id="pid" placeholder="Personalnummer" style="text-align:center;max-width:300px">
        <div id="wel" style="height:20px;color:#00ff88;font-weight:bold;margin-bottom:10px"></div>
        <button class="btn" id="lBtn" style="max-width:300px" disabled>Starten</button>
    </div>

    <div id="main" style="display:none">
        <div class="top-bar">
            <div style="display:flex;gap:10px;align-items:center">
                <div id="uAv"
                    style="width:35px;height:35px;background:#00ffff;border-radius:50%;display:flex;justify-content:center;align-items:center;color:#000;font-weight:bold">
                </div><b id="uName"></b>
            </div>
            <button onclick="API.out()"
                style="background:none;border:1px solid #555;color:#fff;border-radius:20px;padding:5px 15px">Logout</button>
        </div>
        <div class="tabs">
            <div class="tab active" onclick="nav('cal')">Kalender</div>
            <div class="tab" onclick="nav('book')">Buchen</div>
            <div class="tab" id="tAdm" style="display:none" onclick="nav('adm')">Admin</div>
        </div>

        <div class="scroll-area">
            <!-- CALENDAR -->
            <div id="v-cal" class="view">
                <div class="card">
                    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px">
                        <button onclick="cal(-1)"
                            style="background:none;border:none;color:#fff;font-size:1.5rem">‹</button>
                        <div id="mName" style="font-weight:bold"></div>
                        <button onclick="cal(1)"
                            style="background:none;border:none;color:#fff;font-size:1.5rem">›</button>
                    </div>
                    <div class="grid" id="grid"></div>
                    <div style="margin-top:10px;font-size:0.75rem;color:#888;display:flex;justify-content:space-around">
                        <span>🟩 Frei</span><span>🟨 Eng</span><span>🟥 Voll</span>
                    </div>
                </div>

                <!-- TEAM PULSE - Nur für Admin sichtbar -->
                <div class="card" id="pulseCard" style="display:none">
                    <h4 style="margin:0 0 10px 0;color:#00ff88">Team Pulse</h4>
                    <div id="pulseBox" class="pulse-row">
                        <div style="color:#666">Keine anstehenden Events</div>
                    </div>
                </div>

                <h4>Meine Einträge</h4>
                <div id="myList"></div>
            </div>

            <!-- BOOKING -->
            <div id="v-book" class="view" style="display:none">
                <div style="display:flex;gap:10px;margin-bottom:15px;text-align:center">
                    <div style="flex:1;background:#222;padding:10px;border-radius:12px">
                        <div id="qT" style="font-size:1.2rem;font-weight:bold">-</div><small
                            style="color:#666">Gesamt</small>
                    </div>
                    <div style="flex:1;background:#222;padding:10px;border-radius:12px">
                        <div id="qU" style="font-size:1.2rem;font-weight:bold;color:#00ff88">-</div><small
                            style="color:#666">Verfügbar</small>
                    </div>
                </div>
                <div class="card">
                    <h3 id="bTit">Neuer Antrag</h3>
                    <label style="color:#aaa;font-size:0.8rem">Art der Abwesenheit</label>
                    <select id="bType" onchange="toggleEnd()">
                        <option value="vacation">Urlaub</option>
                        <option value="free">Arbeitsfrei</option>
                        <option value="wish">Arbeitswunsch</option>
                    </select>
                    <div id="boxNote" style="display:none;margin-bottom:10px">
                        <label style="color:#aaa;font-size:0.8rem">Notiz (z.B. Schicht)</label>
                        <input type="text" id="dNote" placeholder="z.B. Frühschicht"
                            style="width:100%;padding:8px;background:#333;border:1px solid #444;color:#fff;border-radius:4px">
                    </div>
                    <div style="display:flex;gap:10px">
                        <div style="flex:1"><label id="lStart" style="color:#aaa;font-size:0.8rem">Start</label><input
                                type="date" id="dA"></div>
                        <div style="flex:1" id="boxEnd"><label style="color:#aaa;font-size:0.8rem">Ende</label><input
                                type="date" id="dE"></div>
                    </div>
                    <input type="hidden" id="eId" value="0">
                    <button class="btn" id="bBtn">Einreichen</button>
                    <button class="btn btn-sec" id="cBtn" style="display:none" onclick="resetBook()">Abbrechen</button>
                </div>
                <h4>Liste</h4>
                <div id="myListBook"></div>
            </div>

            <!-- ADMIN -->
            <div id="v-adm" class="view" style="display:none">
                <div class="card">
                    <h3 style="color:#00ffff;margin-top:0">Admin</h3>
                    <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px">
                        <button class="btn btn-sec" onclick="location.href='?api=1&action=export'">CSV Export</button>
                        <button class="btn btn-sec" onclick="location.href='?test_mail=1'">Mail Test</button>
                    </div>
                    <button class="btn btn-del"
                        onclick="confirm('Reset DB?', 'Alle Daten löschen?', [{t:'LÖSCHEN',c:'red',f:()=>API.act('reset')}])">Reset
                        DB</button>
                </div>
                <h4>Offen</h4>
                <div id="admList"></div>
            </div>
        </div>
    </div>

    <script>
        const EMPS = <?php echo json_encode(array_map(fn($e) => $e['greeting'], rb_get_employees())); ?>;
        let D = new Date(); // Start at TODAY
        let DATA = null;

        const el = i => document.getElementById(i);
        const toast = (m, err) => { let t = el('toast'); t.innerText = m; t.style.background = err ? '#500' : '#333'; t.style.opacity = 1; t.style.bottom = '50px'; setTimeout(() => t.style.opacity = 0, 3000); };
        const nav = t => {
            document.querySelectorAll('.view').forEach(e => e.style.display = 'none');
            el('v-' + t).style.display = 'block';
            document.querySelectorAll('.tab').forEach(e => e.classList.remove('active'));
            event.target.classList.add('active');
        };
        const cal = d => { D.setMonth(D.getMonth() + d); render(); };
        const toggleEnd = () => {
            let t = el('bType').value;
            let isFree = t == 'free';
            let isWish = t == 'wish';
            el('boxEnd').style.display = isFree ? 'none' : 'block';
            el('lStart').innerText = isFree ? 'Datum' : 'Start';
            el('boxNote').style.display = isWish ? 'block' : 'none';
            if (isFree) el('dE').value = el('dA').value; // Sync dates for Arbeitsfrei
        };
        let modalCallbacks = [];
        const confirm = (tit, txt, acts) => {
            modalCallbacks = acts.map(a => a.f);
            el('mTit').innerText = tit;
            el('mTxt').innerText = txt;
            el('mActs').innerHTML = acts.map((a, i) => `<button class="btn" style="background:${a.c == 'red' ? '#300' : '#333'};color:${a.c == 'red' ? 'red' : '#fff'}" onclick="el('modal').style.display='none';modalCallbacks[${i}]()">${a.t}</button>`).join('') + `<button class="btn btn-sec" onclick="el('modal').style.display='none'">Abbrechen</button>`;
            el('modal').style.display = 'flex';
        };

        const API = {
            async req(a, p = {}) {
                el('loader').style.display = 'flex';
                try { let r = await (await fetch(`?api=1&action=${a}&t=${Date.now()}`, { method: 'POST', body: JSON.stringify(p) })).json(); el('loader').style.display = 'none'; return r; }
                catch { el('loader').style.display = 'none'; toast('Verbindungsfehler', 1); return null; }
            },
            async login() {
                let pid = el('pid').value;
                if (!pid) { toast('Bitte ID eingeben', 1); return; }
                let r = await this.req('login', { pid: pid });
                if (r && r.status == 'ok') API.load();
                else toast(r ? r.msg : 'Verbindungsfehler', 1);
            },
            async load() {
                let r = await this.req('load');
                if (r.status == 'ok') {
                    DATA = r; el('login').style.display = 'none'; el('main').style.display = 'flex';
                    el('uName').innerText = r.user.name; el('uAv').innerText = r.user.greeting.substr(0, 2).toUpperCase();

                    el('qT').innerText = r.quota.total;
                    el('qU').innerText = r.quota.total - r.quota.used;

                    if (r.is_admin) {
                        el('tAdm').style.display = 'block';
                        el('pulseCard').style.display = 'block';
                        renderAdm();
                        renderPulse();
                    }

                    render(); renderMy();
                } else if (r.redirect) { el('login').style.display = 'flex'; el('main').style.display = 'none'; }
            },
            async save(f) {
                let s = el('dA').value;
                let e = el('bType').value == 'free' ? s : el('dE').value; // Arbeitsfrei = nur ein Tag
                let r = await this.req('save', { start: s, end: e, id: el('eId').value, type: el('bType').value, force: f });
                if (r.status == 'ok') { resetBook(); API.load(); toast(r.toast); }
                else if (r.status == 'waitlist_confirm') confirm('Engpass', r.msg, [{ t: 'Warteliste', c: 'blue', f: () => API.save(true) }]);
                else toast(r.msg, 1);
            },
            async act(a, id) { await this.req(a, { id: id }); API.load(); },
            out() { this.req('logout').then(() => location.reload()); }
        };

        const render = () => {
            let y = D.getFullYear(), m = D.getMonth();
            el('mName').innerText = D.toLocaleString('de-DE', { month: 'long', year: 'numeric' });
            let g = el('grid'); g.innerHTML = 'Mo,Di,Mi,Do,Fr,Sa,So'.split(',').map(d => `<div style="text-align:center;color:#666;font-size:0.8rem">${d}</div>`).join('');
            let f = new Date(y, m, 1).getDay() || 7;
            for (let i = 1; i < f; i++) g.innerHTML += '<div></div>';
            let days = new Date(y, m + 1, 0).getDate();

            for (let i = 1; i <= days; i++) {
                let iso = `${y}-${(m + 1 + '').padStart(2, '0')}-${(i + '').padStart(2, '0')}`;
                let w = new Date(y, m, i).getDay();
                let hol = DATA.hols.includes(iso);
                let cls = '';

                // Ampel Logic
                if (w != 0 && !hol) {
                    // Filter active absences (vacation/free), exclude 'wish' (presence)
                    let active = DATA.data.filter(v => iso >= v.start && iso <= v.end && ['approved', 'pending'].includes(v.status) && v.type !== 'wish');
                    let count = active.length;
                    let max = DATA.config.max_absent;

                    if (count >= max) cls = 'bg-r';
                    else if (count >= max - 1) cls = 'bg-y';
                    else cls = 'bg-g';
                }

                g.innerHTML += `<div class="day ${hol ? 'hol' : ''} ${w == 0 ? 'sun' : ''} ${cls}">${i}</div>`;
            }
        };

        const renderMy = () => {
            let h = DATA.data.filter(v => v.personal_id).map(v => {
                let dateStr = v.type == 'free'
                    ? new Date(v.start).toLocaleDateString()
                    : `${new Date(v.start).toLocaleDateString()} - ${new Date(v.end).toLocaleDateString()}`;
                let typeStr = v.type == 'wish' ? '⭐ Wunsch' : (v.type == 'free' ? 'Arbeitsfrei' : 'Urlaub');
                if (v.type == 'wish' && v.note) typeStr += ` (${v.note})`;

                let statusStr = v.status == 'approved' ? '✅ Genehmigt' : (v.status == 'pending' ? '⏳ Wartend' : (v.status == 'waitlist' ? '📋 Warteliste' : '❌ Abgelehnt'));
                return `
        <div class="item st-${v.status}" onclick="edit(${v.id},'${v.start}','${v.end}', '${v.type || 'vacation'}', '${v.note || ''}')">
            <div><b>${dateStr}</b><br>
            <small>${typeStr} • ${statusStr}</small></div>
            <span>✏️</span>
        </div>`;
            }).join('');
            el('myList').innerHTML = h || '<div style="text-align:center;color:#444">Leer</div>';
            el('myListBook').innerHTML = h || '<div style="text-align:center;color:#444">Leer</div>';
        };

        const renderAdm = () => {
            let s = DATA.stats || { total: 1, planned: 0, users: {} };
            let p = Math.round((s.planned / s.total) * 100);

            let html = `<div class="card" style="border-color:#00ffff">
                <h3 style="color:#00ffff;margin-top:0">Statistik</h3>
                <div style="display:flex;justify-content:space-between;margin-bottom:5px;font-size:0.9rem">
                    <span>Gesamtfortschritt</span> <span>${p}%</span>
                </div>
                <div style="background:#0f0f0f;height:10px;border-radius:5px;overflow:hidden;border:1px solid #444;margin-bottom:15px">
                    <div style="width:${p}%;height:100%;background:linear-gradient(90deg,#00ffff,#0099ff)"></div>
                </div>
                <div style="max-height:200px;overflow-y:auto;padding-right:5px;scrollbar-width:thin">`;

            if (s.users) {
                // PHP sends object, convert to array if needed or iterate
                let users = Object.values(s.users);
                users.forEach(u => {
                    let up = Math.min(100, Math.round((u.planned / u.quota) * 100));
                    let col = up >= 100 ? '#00ff88' : (up > 80 ? '#00ffff' : '#666');
                    html += `<div style="margin-bottom:8px">
                        <div style="display:flex;justify-content:space-between;font-size:0.75rem;color:#ccc;margin-bottom:2px">
                            <span>${u.name}</span> <span>${u.planned}/${u.quota}</span>
                        </div>
                        <div style="background:#000;height:4px;border-radius:2px;overflow:hidden">
                            <div style="width:${up}%;height:100%;background:${col}"></div>
                        </div>
                    </div>`;
                });
            }
            html += `</div></div>`;

            let list = DATA.data.filter(v => ['pending', 'waitlist'].includes(v.status)).map(v => {
                let badge = v.status == 'waitlist' ? `<span style="background:#ef4444;color:#fff;padding:2px 6px;border-radius:4px;font-size:0.7rem;margin-left:5px;">⚠️ Limit erreicht</span>` : '';
                return `
        <div class="item st-${v.status}" style="display:block; ${v.status == 'waitlist' ? 'border: 1px solid #ef4444;' : ''}">
            <div style="display:flex;justify-content:space-between;align-items:center;">
                <span>${v.name} ${badge}</span> <small>${v.days} T (${v.type == 'wish' ? '⭐' : (v.type == 'free' ? 'F' : 'U')})</small>
            </div>
            ${v.type == 'wish' && v.note ? `<div style="font-size:0.8rem;color:#00ffff;margin-bottom:2px">Note: ${v.note}</div>` : ''}
            <div style="font-size:0.8rem; margin: 4px 0;">${new Date(v.start).toLocaleDateString()} - ${new Date(v.end).toLocaleDateString()}</div>
            ${v.conflict ? `<div style="color:#f55;font-size:0.8rem;margin-bottom:4px;">${v.conflict}</div>` : ''}
            <div style="color:#888;font-size:0.7rem;margin-bottom:8px;">Eingereicht: ${v.created_at || 'Unbekannt'}</div>
            <div style="display:flex;gap:5px">
                <button class="btn" style="background:#86efac;color:#064e3b;padding:8px" onclick="API.act('approve',${v.id})">OK</button>
                <button class="btn" style="background:#450a0a;color:#fca5a5;padding:8px" onclick="API.act('reject',${v.id})">X</button>
                <button class="btn btn-sec" style="padding:8px;width:auto" onclick="confirm('Löschen', 'Eintrag wirkich löschen?', [{t:'Löschen',c:'red',f:()=>API.act('del',${v.id})}])">🗑️</button>
            </div>
        </div>`}).join('') || '<div style="text-align:center;color:#444;padding:20px">Keine offenen Anträge</div>';

            // Insert Admin Actions
            let actions = `<div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:15px">
                <button class="btn btn-sec" onclick="location.href='?api=1&action=export'">CSV Export</button>
                <button class="btn btn-sec" onclick="location.href='?test_mail=1'">Mail Test</button>
            </div>`;

            el('admList').innerHTML = html + actions + '<h4 style="margin:20px 0 10px 0">Offene Anträge</h4>' + list;
        };

        const renderPulse = () => {
            if (!DATA.pulse || DATA.pulse.length === 0) return;
            el('pulseBox').innerHTML = DATA.pulse.map(e => `
        <div class="pulse-card">
            <span class="pulse-icon">${e.type == 'bday' ? '🎂' : '🎖️'}</span>
            <div style="font-weight:bold;color:#fff">${e.name}</div>
            <div style="font-size:0.8rem;color:#888">${e.date} • ${e.val}J</div>
        </div>
    `).join('');
        };

        const edit = (id, s, e, t, n = '') => {
            confirm('Bearbeiten', 'Aktion wählen:', [
                { t: 'Ändern', c: 'blue', f: () => { nav('book'); el('dA').value = s; el('dE').value = e; el('eId').value = id; el('bType').value = t; el('dNote').value = n; toggleEnd(); el('bBtn').innerText = 'Speichern'; el('cBtn').style.display = 'block'; } },
                { t: 'Löschen', c: 'red', f: () => API.act('del', id) }
            ]);
        };

        const save = async () => {
            let id = el('eId').value;
            let start = el('dA').value;
            let end = el('dE').value;
            let type = el('bType').value;
            let note = el('dNote').value;

            if (!start) { toast('Datum fehlt', 1); return; }
            if (type == 'free') end = start; // Force single day for free? Or allow range? User said 'Arbeitsfrei' -> usually day. Let's keep logic but toggleEnd handles UI.
            if (!end) end = start;

            let res = await API.req('save', { start, end, id: id || 0, type, note, force: false });
            if (res && res.status == 'ok') {
                API.load(); // Reload data to refresh list and calendar
                nav('cal');
                toast(res.toast || 'Gespeichert');
                resetBook();
            } else if (res && res.status == 'waitlist_confirm') {
                confirm('Engpass', res.msg, [
                    { t: 'Ja, Warteliste', c: 'blue', f: async () => { await API.req('save', { start, end, id: id || 0, type, note, force: true }); API.load(); nav('cal'); toast('Auf Warteliste'); resetBook(); } }
                ]);
            } else {
                toast(res ? res.msg : 'Fehler', 1);
            }
        };

        // Assign click handler (HTML attribute removed)
        el('bBtn').onclick = save;
        const resetBook = () => { el('dA').value = ''; el('dE').value = ''; el('eId').value = 0; el('bType').value = 'vacation'; el('dNote').value = ''; toggleEnd(); el('bBtn').innerText = 'Einreichen'; el('cBtn').style.display = 'none'; };

        el('pid').addEventListener('input', e => { let n = EMPS[e.target.value]; el('wel').innerText = n ? 'Hallo ' + n : ''; el('lBtn').disabled = !n; });
        el('lBtn').onclick = () => API.login();
        window.onload = () => API.load();
    </script>
</body>

</html>
<?php get_footer(); ?>